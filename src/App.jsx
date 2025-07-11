import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import AppLayout from "./pages/AppLayout"
import City from "./components/City"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import Form from "./components/Form"
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./pages/ProtectedRoute"

const App = () => {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Homepage />} />
                        <Route path="product" element={<Product />} />
                        <Route path="pricing" element={<Pricing />} />
                        <Route
                            path="app"
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>}
                        >
                            <Route index element={<Navigate replace to='cities' />} />
                            <Route path="cities" element={<CityList />} />
                            <Route path="cities/:id" element={<City />} />
                            <Route path="countries" element={<CountryList />} />
                            <Route path="form" element={<Form />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    )
}

export default App