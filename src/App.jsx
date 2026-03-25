import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/routes/AppRouter'
import { WishlistProvider } from '@/application/context/WishlistContext'

export default function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <AppRouter />
      </WishlistProvider>
    </BrowserRouter>
  )
}
