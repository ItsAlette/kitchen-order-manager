import { useEffect, useState } from "react"
import {
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Trash2,
  X,
} from "lucide-react"

import { supabase } from "../lib/supabase"

type Supplier = {
  id: number
  first_name: string
  last_name: string
  phone: string | null
  email: string | null
  address: string | null
  created_at: string
}

function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState("")

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
  })

  useEffect(() => {
    fetchSuppliers()
  }, [])

  async function fetchSuppliers() {
    setLoading(true)

    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      setLoading(false)
      return
    }

    setSuppliers(data || [])
    setLoading(false)
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault()

    if (!form.first_name || !form.last_name) {
      return
    }

    const { error } = await supabase
      .from("suppliers")
      .insert([form])

    if (error) {
      console.error(error)
      return
    }

    setForm({
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      address: "",
    })

    setShowForm(false)

    fetchSuppliers()
  }

  async function deleteSupplier(id: number) {
    const { error } = await supabase
      .from("suppliers")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
      return
    }

    fetchSuppliers()
  }

  const filteredSuppliers = suppliers.filter((supplier) => {
    const fullName =
      `${supplier.first_name} ${supplier.last_name}`.toLowerCase()

    return fullName.includes(search.toLowerCase())
  })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-navy md:text-3xl">
            Fournisseurs
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            Gérez vos fournisseurs alimentaires
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-primary
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-primary/90
          "
        >
          <Plus size={19} />

          Ajouter un fournisseur
        </button>

      </div>


      {/* Recherche */}
      <div className="relative">

        <Search
          size={19}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="text"
          placeholder="Rechercher un fournisseur..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            bg-white
            py-3
            pl-11
            pr-4
            text-sm
            outline-none
            transition
            focus:border-primary
            focus:ring-2
            focus:ring-primary/10
          "
        />

      </div>


      {/* Liste */}
      <div className="grid gap-4 lg:grid-cols-2">

        {loading ? (

          <div className="rounded-2xl bg-white p-8 text-center text-gray-500">
            Chargement des fournisseurs...
          </div>

        ) : filteredSuppliers.length === 0 ? (

          <div className="rounded-2xl bg-white p-8 text-center lg:col-span-2">

            <p className="font-semibold text-navy">
              Aucun fournisseur
            </p>

            <p className="mt-1 text-sm text-text-secondary">
              Ajoutez votre premier fournisseur.
            </p>

          </div>

        ) : (

          filteredSuppliers.map((supplier) => (

            <div
              key={supplier.id}
              className="
                rounded-2xl
                bg-white
                p-5
                shadow-sm
              "
            >

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-primary/10
                      font-bold
                      text-primary
                    "
                  >
                    {supplier.first_name.charAt(0)}
                    {supplier.last_name.charAt(0)}
                  </div>

                  <div>

                    <h2 className="font-bold text-navy">
                      {supplier.first_name}{" "}
                      {supplier.last_name}
                    </h2>

                    <p className="text-xs text-text-secondary">
                      Fournisseur
                    </p>

                  </div>

                </div>


                <button
                  onClick={() =>
                    deleteSupplier(supplier.id)
                  }
                  className="
                    rounded-lg
                    p-2
                    text-gray-400
                    transition
                    hover:bg-red-50
                    hover:text-red-500
                  "
                  aria-label="Supprimer"
                >
                  <Trash2 size={18} />
                </button>

              </div>


              <div className="mt-5 space-y-3">

                {supplier.phone && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">

                    <Phone
                      size={17}
                      className="text-secondary"
                    />

                    <span>
                      {supplier.phone}
                    </span>

                  </div>
                )}


                {supplier.email && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">

                    <Mail
                      size={17}
                      className="text-secondary"
                    />

                    <span className="break-all">
                      {supplier.email}
                    </span>

                  </div>
                )}


                {supplier.address && (
                  <div className="flex items-start gap-3 text-sm text-gray-600">

                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-secondary"
                    />

                    <span>
                      {supplier.address}
                    </span>

                  </div>
                )}

              </div>

            </div>

          ))

        )}

      </div>


      {/* =====================================================
          FORMULAIRE
          ===================================================== */}

      {showForm && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-end
            justify-center
            bg-black/40
            p-0
            sm:items-center
            sm:p-4
          "
        >

          <div
            className="
              max-h-[90vh]
              w-full
              overflow-y-auto
              rounded-t-3xl
              bg-white
              p-6
              sm:max-w-lg
              sm:rounded-3xl
            "
          >

            {/* Form header */}
            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-navy">
                  Ajouter un fournisseur
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  Renseignez les informations du fournisseur.
                </p>
              </div>

              <button
                type="button"
                aria-label="Fermer le formulaire"
                title="Fermer le formulaire"
                onClick={() => setShowForm(false)}
                className="
                  rounded-full
                  bg-gray-100
                  p-2
                  text-gray-500
                  hover:bg-gray-200
                "
              >
                <X size={20} />
              </button>

            </div>


            {/* Formulaire */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1 block text-sm font-medium text-navy">
                    Prénom *
                  </label>

                  <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      px-4
                      py-3
                      text-sm
                      outline-none
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />
                </div>


                <div>
                  <label className="mb-1 block text-sm font-medium text-navy">
                    Nom *
                  </label>

                  <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      px-4
                      py-3
                      text-sm
                      outline-none
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />
                </div>

              </div>


              <div>
                <label className="mb-1 block text-sm font-medium text-navy">
                  Téléphone
                </label>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+221 ..."
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />
              </div>


              <div>
                <label className="mb-1 block text-sm font-medium text-navy">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="fournisseur@email.com"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />
              </div>


              <div>
                <label className="mb-1 block text-sm font-medium text-navy">
                  Adresse
                </label>

                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Adresse du fournisseur"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />
              </div>


              {/* Boutons */}
              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="
                    rounded-xl
                    border
                    border-gray-200
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-gray-600
                    hover:bg-gray-50
                  "
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="
                    rounded-xl
                    bg-primary
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-primary/90
                  "
                >
                  Enregistrer
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default Suppliers