import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "../widgets/header";
import { AllCatsPage } from "../pages/allCats";
import { FavoriteCatsPage } from "../pages/favoriteCats";
import {Box} from "@mui/material";

function App() {
    return (
        <HashRouter>
            <Header />
            <Box sx={{marginTop:'80px'}}>
                <Routes>
                    <Route path="/" element={<AllCatsPage />} />
                    <Route path="/favoriteCats" element={<FavoriteCatsPage />} />
                </Routes>
            </Box>

        </HashRouter>
    );
}

export default App;
