import { createContext, useContext, useEffect, useReducer } from "react";
import { supabase } from "../config/supabaseConfig";

const AuthContext = createContext();

const initalState = {
    user: null,
    session: null,
    loading: true
}

function reducer(state, action) {
    switch (action.type) {
        case 'session/loaded':
            return {
                ...state,
                user: action.payload?.user ?? null,
                session: action.payload,
                loading: false
            }
        case 'logout':
            return {
                ...state,
                user: null,
                session: null
            }
        default:
            throw new Error("Unknown action type");
    }
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("AuthContext was used outside of the AuthProvider");
    return context;
}

function AuthProvider({ children }) {
    const [{ user, session }, dispatch] = useReducer(reducer, initalState);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            dispatch({ type: "session/loaded", payload: session })
            console.log(session);
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            dispatch({ type: "session/loaded", payload: session });

            if (_event === "SIGNED_IN" && session) {
                handleUserInsert(session);
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
        if (error) console.error('Google Sign-In Error:', error)
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        dispatch({ type: "logout" })
    }

    const handleUserInsert = async (session) => {
        if (!session?.user) return;

        const { id, email, user_metadata } = session.user;

        const { data: existingUser, error } = await supabase
            .from("users")
            .select("id")
            .eq("id", id)
            .single();

        if (!existingUser) {
            await supabase.from("users").insert({
                id: id,
                email: email,
                full_name: user_metadata.full_name,
                avatar_url: user_metadata.avatar_url,
            });
        }
    };

    return (
        <AuthContext.Provider value={{ session, user, signOut, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}


export { useAuth, AuthProvider }