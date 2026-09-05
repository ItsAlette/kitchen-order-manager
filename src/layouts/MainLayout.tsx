import { NavLink, Outlet } from "react-router-dom"
import {
  Home,
  ShoppingCart,
  Package,
  BarChart3,
  User,
  CalendarDays,
  UtensilsCrossed,
  Truck,
  Building2,
} from "lucide-react"

function MainLayout() {
  const desktopMenu = [
    {
      label: "Tableau de bord",
      path: "/",
      icon: Home,
    },
    {
      label: "Commandes",
      path: "/commandes",
      icon: ShoppingCart,
    },
    {
      label: "Planning",
      path: "/planning",
      icon: CalendarDays,
    },
    {
      label: "Menus",
      path: "/menus",
      icon: UtensilsCrossed,
    },
    {
      label: "Produits",
      path: "/produits",
      icon: Package,
    },
    {
      label: "Fournisseurs",
      path: "/fournisseurs",
      icon: Building2,
    },
    {
      label: "Statistiques",
      path: "/statistiques",
      icon: BarChart3,
    },
  ]

  const mobileMenu = [
    {
      label: "Accueil",
      path: "/",
      icon: Home,
    },
    {
      label: "Commandes",
      path: "/commandes",
      icon: ShoppingCart,
    },
    {
      label: "Produits",
      path: "/produits",
      icon: Package,
    },
    {
      label: "Statistiques",
      path: "/statistiques",
      icon: BarChart3,
    },
    {
      label: "Profil",
      path: "/profil",
      icon: User,
    },
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* =====================================================
          DESKTOP
          ===================================================== */}

      <div className="hidden md:flex">

        {/* Sidebar */}
        <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-navy p-5">

          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-white">
              Kitchen Order
            </h1>

            <p className="text-sm text-white/60">
              Manager
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">

            {desktopMenu.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} strokeWidth={2} />

                  <span>{item.label}</span>
                </NavLink>
              )
            })}

          </nav>

          {/* User */}
          <div className="mt-auto rounded-xl bg-white/10 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <User
                  size={20}
                  className="text-primary"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Utilisateur
                </p>

                <p className="text-xs text-white/60">
                  Gestionnaire
                </p>
              </div>

            </div>

          </div>

        </aside>

        {/* Desktop content */}
        <main className="ml-64 min-h-screen min-w-0 flex-1 p-6">
          <Outlet />
        </main>

      </div>


      {/* =====================================================
          MOBILE
          ===================================================== */}

      <div className="md:hidden">

        {/* Contenu */}
        <main className="min-h-screen pb-28">
          <Outlet />
        </main>


        {/* =================================================
            BOTTOM NAVIGATION
            ================================================= */}

        <nav
          className="
            fixed
            bottom-4
            left-4
            right-4
            z-50
            rounded-[28px]
            border
            border-gray-200
            bg-white/95
            px-2
            py-2
            shadow-xl
            backdrop-blur-md
          "
        >

          <div className="grid grid-cols-5">

            {mobileMenu.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-1 rounded-2xl py-2 transition ${
                      isActive
                        ? "text-primary"
                        : "text-gray-400"
                    }`
                  }
                >

                  {({ isActive }) => (
                    <>
                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          transition
                          ${
                            isActive
                              ? "bg-primary/10"
                              : ""
                          }
                        `}
                      >
                        <Icon
                          size={23}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      </div>

                      <span
                        className={`
                          text-[11px]
                          font-medium
                          ${
                            isActive
                              ? "text-primary"
                              : "text-gray-400"
                          }
                        `}
                      >
                        {item.label}
                      </span>
                    </>
                  )}

                </NavLink>
              )
            })}

          </div>

        </nav>

      </div>

    </div>
  )
}

export default MainLayout