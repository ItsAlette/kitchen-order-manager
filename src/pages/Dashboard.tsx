import {
  Bell,
  User,
  ShoppingCart,
  Truck,
  Coins,
  AlertCircle,
  Plus,
  Users,
  Package,
  CalendarDays,
  ChevronRight,
} from "lucide-react"

function Dashboard() {
  return (
    <div className="min-h-screen bg-background">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header
        className="
          relative
          -mx-0
          overflow-hidden
          rounded-b-[32px]
          bg-navy
          px-5
          pb-8
          pt-6
          md:rounded-2xl
          md:px-8
          md:py-8
        "
      >

        {/* Décoration */}
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-primary/20" />

        <div className="relative flex items-center justify-between">

          {/* Utilisateur */}
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-md
              "
            >
              <User
                size={27}
                className="text-primary"
              />
            </div>

            <div>

              <p className="text-sm text-white/70">
                Bonjour,
              </p>

              <h1 className="text-xl font-bold text-white">
                Utilisateur
              </h1>

              <p className="text-xs text-white/50">
                Kitchen Order Manager
              </p>

            </div>

          </div>


          {/* Notifications */}
          <button
            className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white
            "
          >

            <Bell
              size={23}
              className="text-navy"
            />

            <span
              className="
                absolute
                right-1
                top-1
                h-3
                w-3
                rounded-full
                bg-red-500
              "
            />

          </button>

        </div>

      </header>


      {/* =====================================================
          CONTENU
          ===================================================== */}

      <div className="space-y-6 p-4 md:p-8">


        {/* =================================================
            VUE D'ENSEMBLE
            ================================================= */}

        <section
          className="
            rounded-[28px]
            bg-white
            p-5
            shadow-sm
            md:p-6
          "
        >

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-bold text-navy md:text-2xl">
              Vue d'ensemble
            </h2>

            <button
              className="
                rounded-full
                border
                border-gray-200
                px-4
                py-2
                text-sm
                text-gray-600
              "
            >
              Ce mois
            </button>

          </div>


          {/* KPI */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">


            {/* Commandes */}
            <div className="rounded-2xl bg-primary/5 p-4">

              <div className="flex items-center justify-between">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-primary/10
                  "
                >
                  <ShoppingCart
                    size={23}
                    className="text-primary"
                  />
                </div>

                <ChevronRight
                  size={20}
                  className="text-gray-400"
                />

              </div>

              <p className="mt-3 text-sm text-gray-500">
                Commandes en cours
              </p>

              <p className="mt-1 text-3xl font-bold text-primary">
                12
              </p>

            </div>


            {/* À venir */}
            <div className="rounded-2xl bg-secondary/5 p-4">

              <div className="flex items-center justify-between">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-secondary/10
                  "
                >
                  <Truck
                    size={23}
                    className="text-secondary"
                  />
                </div>

                <ChevronRight
                  size={20}
                  className="text-gray-400"
                />

              </div>

              <p className="mt-3 text-sm text-gray-500">
                Commandes à venir
              </p>

              <p className="mt-1 text-3xl font-bold text-secondary">
                5
              </p>

            </div>


            {/* Dépenses */}
            <div className="rounded-2xl bg-accent/5 p-4">

              <div className="flex items-center justify-between">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-accent/10
                  "
                >
                  <Coins
                    size={23}
                    className="text-accent"
                  />
                </div>

                <ChevronRight
                  size={20}
                  className="text-gray-400"
                />

              </div>

              <p className="mt-3 text-sm text-gray-500">
                Dépenses du mois
              </p>

              <p className="mt-1 text-2xl font-bold text-accent">
                450 000
              </p>

              <p className="text-sm font-semibold text-accent">
                FCFA
              </p>

            </div>


            {/* Alertes */}
            <div className="rounded-2xl bg-red-50 p-4">

              <div className="flex items-center justify-between">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-red-100
                  "
                >
                  <AlertCircle
                    size={23}
                    className="text-red-500"
                  />
                </div>

                <ChevronRight
                  size={20}
                  className="text-gray-400"
                />

              </div>

              <p className="mt-3 text-sm text-gray-500">
                Alertes
              </p>

              <p className="mt-1 text-3xl font-bold text-red-500">
                2
              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            ACTIONS RAPIDES
            ================================================= */}

        <section
          className="
            rounded-[28px]
            bg-white
            p-5
            shadow-sm
            md:p-6
          "
        >

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-bold text-navy md:text-2xl">
              Actions rapides
            </h2>

            <span className="text-sm font-semibold text-primary">
              Voir tout
            </span>

          </div>


          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">


            {/* Nouvelle commande */}
            <button className="group flex flex-col items-center text-center">

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary/10
                  transition
                  group-hover:scale-105
                "
              >
                <Plus
                  size={30}
                  className="text-primary"
                />
              </div>

              <span className="mt-2 text-sm font-semibold text-navy">
                Nouvelle commande
              </span>

            </button>


            {/* Fournisseurs */}
            <button className="group flex flex-col items-center text-center">

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-secondary/10
                  transition
                  group-hover:scale-105
                "
              >
                <Users
                  size={28}
                  className="text-secondary"
                />
              </div>

              <span className="mt-2 text-sm font-semibold text-navy">
                Fournisseurs
              </span>

            </button>


            {/* Produits */}
            <button className="group flex flex-col items-center text-center">

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-accent/10
                  transition
                  group-hover:scale-105
                "
              >
                <Package
                  size={28}
                  className="text-accent"
                />
              </div>

              <span className="mt-2 text-sm font-semibold text-navy">
                Produits
              </span>

            </button>


            {/* Planning */}
            <button className="group flex flex-col items-center text-center">

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-purple-100
                  transition
                  group-hover:scale-105
                "
              >
                <CalendarDays
                  size={28}
                  className="text-purple-600"
                />
              </div>

              <span className="mt-2 text-sm font-semibold text-navy">
                Planning
              </span>

            </button>

          </div>

        </section>


        {/* =================================================
            DERNIÈRES COMMANDES
            ================================================= */}

        <section
          className="
            rounded-[28px]
            bg-white
            p-5
            shadow-sm
            md:p-6
          "
        >

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-xl font-bold text-navy md:text-2xl">
              Dernières commandes
            </h2>

            <span className="text-sm font-semibold text-primary">
              Voir tout
            </span>

          </div>


          <div className="divide-y divide-gray-100">


            {/* Commande 1 */}
            <div className="flex items-center gap-3 py-4">

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary/10
                "
              >
                <ShoppingCart
                  size={21}
                  className="text-primary"
                />
              </div>


              <div className="min-w-0 flex-1">

                <p className="font-bold text-navy">
                  CMD-2025-001
                </p>

                <p className="truncate text-sm text-gray-500">
                  Fournisseur A
                </p>

                <p className="text-xs text-gray-400">
                  Aujourd'hui à 10:30
                </p>

              </div>


              <div className="text-right">

                <span
                  className="
                    rounded-full
                    bg-primary/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-primary
                  "
                >
                  Reçue
                </span>

                <p className="mt-1 text-sm font-semibold text-navy">
                  120 000 FCFA
                </p>

              </div>

              <ChevronRight
                size={19}
                className="text-gray-400"
              />

            </div>


            {/* Commande 2 */}
            <div className="flex items-center gap-3 py-4">

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-secondary/10
                "
              >
                <Truck
                  size={21}
                  className="text-secondary"
                />
              </div>


              <div className="min-w-0 flex-1">

                <p className="font-bold text-navy">
                  CMD-2025-002
                </p>

                <p className="truncate text-sm text-gray-500">
                  Fournisseur B
                </p>

                <p className="text-xs text-gray-400">
                  Hier à 15:20
                </p>

              </div>


              <div className="text-right">

                <span
                  className="
                    rounded-full
                    bg-accent/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-accent
                  "
                >
                  En livraison
                </span>

                <p className="mt-1 text-sm font-semibold text-navy">
                  85 000 FCFA
                </p>

              </div>

              <ChevronRight
                size={19}
                className="text-gray-400"
              />

            </div>


          </div>

        </section>

      </div>

    </div>
  )
}

export default Dashboard