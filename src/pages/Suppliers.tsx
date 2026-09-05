import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"

import {
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Trash2,
  X,
  Pencil,
  Users,
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

const emptyForm = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  address: "",
}

function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [editingSupplier, setEditingSupplier] =
    useState<Supplier | null>(null)

  const [search, setSearch] = useState("")
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    fetchSuppliers()
  }, [])

  // =====================================================
  // RÉCUPÉRER LES FOURNISSEURS
  // =====================================================

  async function fetchSuppliers() {
    setLoading(true)

    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erreur récupération fournisseurs :", error)
      setLoading(false)
      return
    }

    setSuppliers(data || [])
    setLoading(false)
  }

  // =====================================================
  // CHANGEMENT DES CHAMPS
  // =====================================================

  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  // =====================================================
  // OUVRIR LE FORMULAIRE POUR AJOUTER
  // =====================================================

  function openAddForm() {
    setEditingSupplier(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  // =====================================================
  // OUVRIR LE FORMULAIRE POUR MODIFIER
  // =====================================================

  function openEditForm(supplier: Supplier) {
    setEditingSupplier(supplier)

    setForm({
      first_name: supplier.first_name,
      last_name: supplier.last_name,
      phone: supplier.phone || "",
      email: supplier.email || "",
      address: supplier.address || "",
    })

    setShowForm(true)
  }

  // =====================================================
  // FERMER LE FORMULAIRE
  // =====================================================

  function closeForm() {
    setShowForm(false)
    setEditingSupplier(null)
    setForm(emptyForm)
  }

  // =====================================================
  // AJOUT / MODIFICATION
  // =====================================================

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!form.first_name || !form.last_name) {
      return
    }

    setSaving(true)

    // MODIFICATION
    if (editingSupplier) {
      const { error } = await supabase
        .from("suppliers")
        .update({
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone || null,
          email: form.email || null,
          address: form.address || null,
        })
        .eq("id", editingSupplier.id)

      if (error) {
        console.error("Erreur modification :", error)
        setSaving(false)
        return
      }
    }

    // AJOUT
    else {
      const { error } = await supabase
        .from("suppliers")
        .insert([
          {
            first_name: form.first_name,
            last_name: form.last_name,
            phone: form.phone || null,
            email: form.email || null,
            address: form.address || null,
          },
        ])

      if (error) {
        console.error("Erreur ajout :", error)
        setSaving(false)
        return
      }
    }

    setSaving(false)

    closeForm()
    fetchSuppliers()
  }

  // =====================================================
  // SUPPRIMER
  // =====================================================

  async function deleteSupplier(id: number) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce fournisseur ?"
    )

    if (!confirmed) {
      return
    }

    const { error } = await supabase
      .from("suppliers")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Erreur suppression :", error)
      return
    }

    fetchSuppliers()
  }

  // =====================================================
  // RECHERCHE
  // =====================================================

  const filteredSuppliers = suppliers.filter((supplier) => {
    const text = `
      ${supplier.first_name}
      ${supplier.last_name}
      ${supplier.phone || ""}
      ${supplier.email || ""}
      ${supplier.address || ""}
    `.toLowerCase()

    return text.includes(search.toLowerCase())
  })

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-background">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="px-4 pb-4 pt-5 sm:px-6 sm:pt-6">

        <div className="flex items-start justify-between gap-3">

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-navy">
              Fournisseurs
            </h1>

            <p className="mt-1 text-sm text-text-secondary">
              Gérez vos fournisseurs alimentaires
            </p>
          </div>

          {/* Nombre de fournisseurs */}
          <div
            className="
              flex
              h-10
              min-w-10
              items-center
              justify-center
              rounded-full
              bg-primary/10
              px-3
              text-sm
              font-bold
              text-primary
            "
          >
            {suppliers.length}
          </div>

        </div>

      </div>


      {/* =================================================
          CONTENU
          ================================================= */}

      <div className="space-y-4 px-4 pb-32 sm:px-6">

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
              rounded-2xl
              border
              border-gray-200
              bg-white
              py-3.5
              pl-11
              pr-4
              text-sm
              shadow-sm
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
            "
          />

        </div>


        {/* =================================================
            LISTE
            ================================================= */}

        {loading ? (

          <div
            className="
              rounded-2xl
              bg-white
              p-8
              text-center
              text-sm
              text-text-secondary
              shadow-sm
            "
          >
            Chargement des fournisseurs...
          </div>

        ) : filteredSuppliers.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-gray-200
              bg-white
              px-5
              py-10
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-primary/10
                text-primary
              "
            >
              <Users size={25} />
            </div>

            <p className="mt-4 font-semibold text-navy">
              {search
                ? "Aucun résultat"
                : "Aucun fournisseur"}
            </p>

            <p className="mt-1 text-sm text-text-secondary">
              {search
                ? "Essayez avec un autre nom."
                : "Ajoutez votre premier fournisseur."}
            </p>

          </div>

        ) : (

          <div className="grid gap-3 lg:grid-cols-2">

            {filteredSuppliers.map((supplier) => (

              <div
                key={supplier.id}
                className="
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-4
                  shadow-sm
                  transition
                  hover:shadow-md
                "
              >

                {/* En-tête carte */}

                <div className="flex items-center justify-between">

                  <div className="flex min-w-0 items-center gap-3">

                    {/* Initiales */}

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-primary/10
                        text-sm
                        font-bold
                        text-primary
                      "
                    >
                      {supplier.first_name.charAt(0)}
                      {supplier.last_name.charAt(0)}
                    </div>

                    <div className="min-w-0">

                      <h2 className="truncate font-bold text-navy">
                        {supplier.first_name}{" "}
                        {supplier.last_name}
                      </h2>

                      <p className="mt-0.5 text-xs text-text-secondary">
                        Fournisseur
                      </p>

                    </div>

                  </div>

                  {/* Actions */}

                  <div className="flex shrink-0 items-center gap-1">

                    <button
                      onClick={() =>
                        openEditForm(supplier)
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-primary/10
                        text-primary
                        transition
                        hover:bg-primary/20
                      "
                      aria-label="Modifier"
                      title="Modifier"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={() =>
                        deleteSupplier(supplier.id)
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-red-50
                        text-red-500
                        transition
                        hover:bg-red-100
                      "
                      aria-label="Supprimer"
                      title="Supprimer"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>


                {/* Informations */}

                <div className="mt-4 space-y-2.5">

                  {supplier.phone && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">

                      <div
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-secondary/10
                        "
                      >
                        <Phone
                          size={15}
                          className="text-secondary"
                        />
                      </div>

                      <span className="truncate">
                        {supplier.phone}
                      </span>

                    </div>
                  )}


                  {supplier.email && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">

                      <div
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-secondary/10
                        "
                      >
                        <Mail
                          size={15}
                          className="text-secondary"
                        />
                      </div>

                      <span className="truncate">
                        {supplier.email}
                      </span>

                    </div>
                  )}


                  {supplier.address && (
                    <div className="flex items-start gap-3 text-sm text-gray-600">

                      <div
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-secondary/10
                        "
                      >
                        <MapPin
                          size={15}
                          className="text-secondary"
                        />
                      </div>

                      <span>
                        {supplier.address}
                      </span>

                    </div>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* =================================================
          BOUTON AJOUTER MOBILE
          ================================================= */}

      <button
        onClick={openAddForm}
        className="
          fixed
          bottom-30
          right-4
          z-40
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-primary
          text-white
          shadow-lg
          shadow-primary/25
          transition
          hover:scale-105
          hover:bg-primary/90
          sm:bottom-6
          sm:right-6
          sm:h-auto
          sm:w-auto
          sm:rounded-xl
          sm:px-5
          sm:py-3
        "
        aria-label="Ajouter un fournisseur"
      >

        <Plus size={23} />

        <span className="ml-2 hidden text-sm font-semibold sm:inline">
          Ajouter un fournisseur
        </span>

      </button>


      {/* =================================================
          FORMULAIRE
          ================================================= */}

      {showForm && (

       <div
    className="
      fixed
      inset-0
      z-[80]
      flex
      items-end
      justify-center
      bg-black/40
      p-0
      backdrop-blur-[2px]
      sm:items-center
      sm:p-4
    "
  >

          <div
            className="
              max-h-[92vh]
              w-full
              overflow-y-auto
              rounded-t-3xl
              bg-white
              p-5
              shadow-2xl
              sm:max-w-lg
              sm:rounded-3xl
              sm:p-6
            "
          >

            {/* Form header */}

            <div className="mb-5 flex items-start justify-between gap-4">

              <div>

                <h2 className="text-xl font-bold text-navy">
                  {editingSupplier
                    ? "Modifier le fournisseur"
                    : "Ajouter un fournisseur"}
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  {editingSupplier
                    ? "Modifiez les informations du fournisseur."
                    : "Renseignez les informations du fournisseur."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeForm}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-500
                  transition
                  hover:bg-gray-200
                "
                aria-label="Fermer"
              >
                <X size={19} />
              </button>

            </div>


            {/* Formulaire */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-navy">
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
                      bg-white
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

                  <label className="mb-1.5 block text-sm font-medium text-navy">
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
                      bg-white
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

                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Téléphone
                </label>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Numéro de téléphone"
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

                <label className="mb-1.5 block text-sm font-medium text-navy">
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

                <label className="mb-1.5 block text-sm font-medium text-navy">
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

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeForm}
                  className="
                    order-2
                    rounded-xl
                    border
                    border-gray-200
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-gray-600
                    hover:bg-gray-50
                    sm:order-1
                  "
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    order-1
                    rounded-xl
                    bg-primary
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-primary/90
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:order-2
                  "
                >
                  {saving
                    ? "Enregistrement..."
                    : editingSupplier
                      ? "Enregistrer les modifications"
                      : "Enregistrer"}
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