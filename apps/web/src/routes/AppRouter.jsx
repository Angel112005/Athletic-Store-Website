import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CatalogPage from '../presentation/pages/CatalogPage'
import MainLayout from '../presentation/layouts/MainLayout'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default AppRouter