import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { supabase } from "../config/supabaseConfig";
import { useAuth } from "./AuthContext";

const BASE_URL = 'http://localhost:3000';

const CitiesContext = createContext();

export function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext was used outside of the CitiesProvider");
    return context;
}

const initalState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
}

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true }
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            }
        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: {}
            }
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            throw new Error("Unknown action type");
    }
}

export function CitiesProvider({ children }) {
    const { user } = useAuth();

    const [{ cities, isLoading, currentCity, error }, dispatch] =
        useReducer(
            reducer,
            initalState
        );

    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: "loading" });

            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: "cities/loaded", payload: data });
            } catch (error) {
                dispatch({
                    type: "rejected",
                    payload: `There was an error loading cities...`
                });
            }
        }

        fetchCities();
    }, []);

    async function getCity(id) {
        if (Number(id) === currentCity.id) return;

        dispatch({ type: "loading" });

        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: "city/loaded", payload: data });
        } catch (error) {
            dispatch({
                type: "rejected",
                payload: `There was an error loading city data...`
            });
        }
    }

    async function createCity(city) {
        dispatch({ type: "loading" });

        try {
            const { data, error } = await supabase.from("cities").insert([{
                city_name: city.cityName,
                country: city.country,
                emoji: city.emoji,
                date_visited: city.date,
                notes: city.notes,
                lat: city.position.lat,
                lng: city.position.lng,
                user_id: user.id
            }]).select();

            if (error) throw error;

            dispatch({ type: "city/created", payload: data });

        } catch (error) {
            dispatch({
                type: "rejected",
                payload: `There was an error creating city...`
            });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });

        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });
            dispatch({ type: "city/deleted", payload: id });
        } catch (error) {
            dispatch({
                type: "rejected",
                payload: `There was an error deleting city...`
            });
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                error,
                getCity,
                createCity,
                deleteCity
            }}>
            {children}
        </CitiesContext.Provider>
    )
}