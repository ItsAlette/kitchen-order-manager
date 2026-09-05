import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Package,
  Tag,
  Scale,
  Truck,
  SlidersHorizontal,
} from "lucide-react"

import { supabase } from "../lib/supabase"

type Supplier = {
  id: number
  first_name: string
  last_name: string
}

type Product = {
  id: number
  name: string
  category: string
  unit: string
  current_price: number
  supplier_id: number | null
  description: string | null
  created_at: string
  updated_at: string
  supplier?: Supplier | null
}

const categories = [
  "Fruits",
  "Légumes",
  "Viandes",
  "Poissons & fruits de mer",
  "Produits laitiers",
  "Œufs",
  "Céréales & féculents",
  "Légumineuses",
  "Épices & condiments",
  "Huiles & matières grasses",
  "Boissons",
  "Autres",
]

const units = [
  "kg",
  "g",
  "L",
  "mL",
  "pièce",
  "douzaine",
  "carton",
  "sac",
  "bidon",
  "boîte",
  "paquet",
  "autre",
]

const emptyForm = {
  name: "",
  category: "",
  unit: "",
  current_price: "",
  supplier_id: "",
  description: "",
}

function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null)

  // =====================================================
  // RECHERCHE + FILTRES
  // =====================================================

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedUnit, setSelectedUnit] = useState("")

  // =====================================================
  // FORMULAIRE
  // =====================================================

  const [form, setForm] = useState(emptyForm)

  // =====================================================
  // CHARGEMENT INITIAL
  // =====================================================

  useEffect(() => {
    fetchProducts()
    fetchSuppliers()
  }, [])

  // =====================================================
  // RÉCUPÉRER LES PRODUITS
  // =====================================================

  async function fetchProducts() {
    setLoading(true)

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        supplier:suppliers (
          id,
          first_name,
          last_name
        )
      `)
      .order("created_at", {
        ascending: false,
      })

    if (error) {
      console.error(
        "Erreur récupération produits :",
        error
      )

      setLoading(false)
      return
    }

    setProducts(data || [])
    setLoading(false)
  }

  // =====================================================
  // RÉCUPÉRER LES FOURNISSEURS
  // =====================================================

  async function fetchSuppliers() {
    const { data, error } = await supabase
      .from("suppliers")
      .select(
        "id, first_name, last_name"
      )
      .order("last_name", {
        ascending: true,
      })

    if (error) {
      console.error(
        "Erreur récupération fournisseurs :",
        error
      )

      return
    }

    setSuppliers(data || [])
  }

  // =====================================================
  // CHANGEMENT FORMULAIRE
  // =====================================================

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  // =====================================================
  // AJOUTER
  // =====================================================

  function openAddForm() {
    setEditingProduct(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  // =====================================================
  // MODIFIER
  // =====================================================

  function openEditForm(product: Product) {
    setEditingProduct(product)

    setForm({
      name: product.name,
      category: product.category,
      unit: product.unit,
      current_price: String(
        product.current_price
      ),
      supplier_id: product.supplier_id
        ? String(product.supplier_id)
        : "",
      description:
        product.description || "",
    })

    setShowForm(true)
  }

  // =====================================================
  // FERMER FORMULAIRE
  // =====================================================

  function closeForm() {
    setShowForm(false)
    setEditingProduct(null)
    setForm(emptyForm)
  }

  // =====================================================
  // AJOUT / MODIFICATION
  // =====================================================

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault()

    if (
      !form.name ||
      !form.category ||
      !form.unit ||
      !form.current_price
    ) {
      return
    }

    setSaving(true)

    const productData = {
      name: form.name.trim(),
      category: form.category,
      unit: form.unit,
      current_price: Number(
        form.current_price
      ),
      supplier_id: form.supplier_id
        ? Number(form.supplier_id)
        : null,
      description:
        form.description.trim() || null,
      updated_at:
        new Date().toISOString(),
    }

    // MODIFICATION
    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id)

      if (error) {
        console.error(
          "Erreur modification produit :",
          error
        )

        setSaving(false)
        return
      }
    }

    // AJOUT
    else {
      const { error } = await supabase
        .from("products")
        .insert([productData])

      if (error) {
        console.error(
          "Erreur ajout produit :",
          error
        )

        setSaving(false)
        return
      }
    }

    setSaving(false)

    closeForm()
    fetchProducts()
  }

  // =====================================================
  // SUPPRIMER
  // =====================================================

  async function deleteProduct(
    id: number
  ) {
    const confirmed =
      window.confirm(
        "Voulez-vous vraiment supprimer ce produit ?"
      )

    if (!confirmed) {
      return
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(
        "Erreur suppression produit :",
        error
      )

      return
    }

    fetchProducts()
  }

  // =====================================================
  // FILTRAGE
  // =====================================================

  const filteredProducts =
    products.filter((product) => {
      const searchText =
        `${product.name} ${
          product.category
        } ${product.unit} ${
          product.description || ""
        } ${
          product.supplier?.first_name || ""
        } ${
          product.supplier?.last_name || ""
        }`.toLowerCase()

      const matchesSearch =
        searchText.includes(
          search.toLowerCase()
        )

      const matchesCategory =
        selectedCategory === "" ||
        product.category ===
          selectedCategory

      const matchesUnit =
        selectedUnit === "" ||
        product.unit === selectedUnit

      return (
        matchesSearch &&
        matchesCategory &&
        matchesUnit
      )
    })

  // =====================================================
  // RÉINITIALISER FILTRES
  // =====================================================

  function resetFilters() {
    setSearch("")
    setSelectedCategory("")
    setSelectedUnit("")
  }

  const hasActiveFilters =
    selectedCategory !== "" ||
    selectedUnit !== ""

  // =====================================================
  // FORMAT PRIX
  // =====================================================

  function formatPrice(
    price: number
  ) {
    return `${new Intl.NumberFormat(
      "fr-FR"
    ).format(price)} FCFA`
  }

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-background pb-28 sm:pb-8">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="px-4 pb-5 pt-5 sm:px-6 sm:pt-6">

        <div className="flex items-start justify-between gap-3">

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-navy">
              Produits
            </h1>

            <p className="mt-1 text-sm text-text-secondary">
              Gérez vos produits alimentaires
            </p>

          </div>

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
            {products.length}
          </div>

        </div>

      </div>


      {/* =================================================
          RECHERCHE
          ================================================= */}

      <div className="px-3 sm:px-6">

        <div className="flex items-center gap-2">

          {/* Barre de recherche */}

          <div className="relative flex-1">

            <Search
              size={19}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                pl-10
                pr-4
                text-sm
                text-navy
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />

          </div>


          {/* Bouton filtre */}

          <button
            type="button"
            onClick={() =>
              setShowFilters(true)
            }
            className={`
              relative
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              bg-white
              transition
              ${
                hasActiveFilters
                  ? "border-primary text-primary"
                  : "border-slate-200 text-navy"
              }
            `}
            aria-label="Ouvrir les filtres"
          >

            <SlidersHorizontal
              size={21}
            />

            {/* Petit indicateur */}

            {hasActiveFilters && (

              <span
                className="
                  absolute
                  right-1.5
                  top-1.5
                  h-2
                  w-2
                  rounded-full
                  bg-accent
                "
              />

            )}

          </button>

        </div>


        {/* Résultats */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            px-1
          "
        >

          <p className="text-xs text-text-secondary">

            {filteredProducts.length}{" "}
            produit
            {filteredProducts.length >
            1
              ? "s"
              : ""}

          </p>

          {hasActiveFilters && (

            <button
              type="button"
              onClick={resetFilters}
              className="
                text-xs
                font-semibold
                text-primary
              "
            >
              Réinitialiser
            </button>

          )}

        </div>

      </div>


      {/* =================================================
          LISTE DES PRODUITS
          ================================================= */}

      <div className="px-4 pb-8 pt-5 sm:px-6">

        {loading ? (

          <div className="flex justify-center py-16">

            <div
              className="
                h-8
                w-8
                animate-spin
                rounded-full
                border-4
                border-gray-200
                border-t-primary
              "
            />

          </div>

        ) : filteredProducts.length ===
          0 ? (

          <div
            className="
              rounded-2xl
              bg-white
              px-6
              py-12
              text-center
              shadow-sm
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
              <Package size={26} />
            </div>

            <h3 className="mt-4 font-semibold text-navy">
              Aucun produit trouvé
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm text-text-secondary">
              Aucun produit ne correspond
              à votre recherche ou à vos
              filtres.
            </p>

            {(
              search ||
              hasActiveFilters
            ) && (

              <button
                type="button"
                onClick={resetFilters}
                className="
                  mt-4
                  rounded-xl
                  bg-primary/10
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-primary
                "
              >
                Réinitialiser
              </button>

            )}

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-1
              gap-4
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {filteredProducts.map(
              (product) => (

                <div
                  key={product.id}
                  className="
                    rounded-2xl
                    bg-white
                    p-4
                    shadow-sm
                    transition
                    hover:shadow-md
                  "
                >

                  {/* Header carte */}

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3">

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-primary/10
                          text-primary
                        "
                      >
                        <Package
                          size={21}
                        />
                      </div>

                      <div className="min-w-0">

                        <h3 className="truncate font-semibold text-navy">
                          {product.name}
                        </h3>

                        <p className="mt-0.5 truncate text-xs text-text-secondary">
                          {product.category}
                        </p>

                      </div>

                    </div>


                    {/* Actions */}

                    <div className="flex shrink-0 gap-1">

                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(
                            product
                          )
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          text-gray-500
                          transition
                          hover:bg-primary/10
                          hover:text-primary
                        "
                        aria-label="Modifier"
                      >
                        <Pencil
                          size={17}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteProduct(
                            product.id
                          )
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          text-gray-500
                          transition
                          hover:bg-red-50
                          hover:text-red-500
                        "
                        aria-label="Supprimer"
                      >
                        <Trash2
                          size={17}
                        />
                      </button>

                    </div>

                  </div>


                  {/* Informations */}

                  <div className="mt-4 grid grid-cols-2 gap-2">

                    {/* Unité */}

                    <div
                      className="
                        rounded-xl
                        bg-background
                        p-3
                      "
                    >

                      <div className="flex items-center gap-2">

                        <Scale
                          size={15}
                          className="text-secondary"
                        />

                        <span className="text-xs text-text-secondary">
                          Unité
                        </span>

                      </div>

                      <p className="mt-1 font-semibold text-navy">
                        {product.unit}
                      </p>

                    </div>


                    {/* Prix */}

                    <div
                      className="
                        rounded-xl
                        bg-background
                        p-3
                      "
                    >

                      <div className="flex items-center gap-2">

                        <Tag
                          size={15}
                          className="text-secondary"
                        />

                        <span className="text-xs text-text-secondary">
                          Prix
                        </span>

                      </div>

                      <p className="mt-1 text-sm font-bold text-primary">
                        {formatPrice(
                          product.current_price
                        )}
                      </p>

                    </div>

                  </div>


                  {/* Fournisseur */}

                  {product.supplier && (

                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-background
                        px-3
                        py-2.5
                      "
                    >

                      <Truck
                        size={16}
                        className="shrink-0 text-text-secondary"
                      />

                      <span className="truncate text-xs text-text-secondary">

                        {product.supplier.first_name}{" "}
                        {product.supplier.last_name}

                      </span>

                    </div>

                  )}


                  {/* Description */}

                  {product.description && (

                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                      {product.description}
                    </p>

                  )}

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* =================================================
          PANNEAU FILTRES
          ================================================= */}

      {showFilters && (

        <div
          className="
            fixed
            inset-0
            z-[55]
            flex
            items-end
            justify-center
            bg-black/40
            backdrop-blur-[2px]
            sm:items-center
            sm:p-4
          "
          onClick={() =>
            setShowFilters(false)
          }
        >

          <div
            className="
              w-full
              rounded-t-3xl
              bg-white
              p-5
              shadow-2xl
              sm:max-w-md
              sm:rounded-3xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold text-navy">
                  Filtres
                </h2>

                <p className="mt-1 text-xs text-text-secondary">
                  Affinez votre recherche
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setShowFilters(false)
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-500
                  transition
                  hover:bg-gray-200
                "
                aria-label="Fermer les filtres"
              >

                <X size={18} />

              </button>

            </div>


            {/* Catégorie */}

            <div className="mb-4">

              <label className="mb-2 block text-sm font-semibold text-navy">
                Catégorie
              </label>

              <select
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(
                    event.target.value
                  )
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-sm
                  text-navy
                  outline-none
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              >

                <option value="">
                  Toutes les catégories
                </option>

                {categories.map(
                  (category) => (

                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* Unité */}

            <div className="mb-6">

              <label className="mb-2 block text-sm font-semibold text-navy">
                Unité
              </label>

              <select
                value={selectedUnit}
                onChange={(event) =>
                  setSelectedUnit(
                    event.target.value
                  )
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-sm
                  text-navy
                  outline-none
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              >

                <option value="">
                  Toutes les unités
                </option>

                {units.map((unit) => (

                  <option
                    key={unit}
                    value={unit}
                  >
                    {unit}
                  </option>

                ))}

              </select>

            </div>


            {/* Boutons */}

            <div className="flex gap-3">

              <button
                type="button"
                onClick={resetFilters}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-navy
                  transition
                  hover:bg-gray-50
                "
              >
                Réinitialiser
              </button>


              <button
                type="button"
                onClick={() =>
                  setShowFilters(false)
                }
                className="
                  flex-1
                  rounded-xl
                  bg-primary
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-primary/90
                "
              >
                Appliquer
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          BOUTON AJOUTER
          ================================================= */}

      <button
        type="button"
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
        aria-label="Ajouter un produit"
      >

        <Plus size={23} />

        <span className="ml-2 hidden text-sm font-semibold sm:inline">
          Ajouter un produit
        </span>

      </button>


      {/* =================================================
          FORMULAIRE AJOUT / MODIFICATION
          ================================================= */}

      {showForm && (

        <div
          className="
            fixed
            inset-0
            z-[60]
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
              relative
              z-[70]
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

            {/* Header formulaire */}

            <div className="mb-5 flex items-start justify-between gap-4">

              <div>

                <h2 className="text-xl font-bold text-navy">

                  {editingProduct
                    ? "Modifier le produit"
                    : "Ajouter un produit"}

                </h2>

                <p className="mt-1 text-sm text-text-secondary">

                  {editingProduct
                    ? "Modifiez les informations du produit."
                    : "Renseignez les informations du produit."}

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

              {/* Nom */}

              <div>

                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Nom du produit *
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Ex : Riz parfumé"
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


              {/* Catégorie */}

              <div>

                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Catégorie *
                </label>

                <div className="relative">

                  <Tag
                    size={17}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      px-4
                      py-3
                      pl-11
                      text-sm
                      outline-none
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  >

                    <option value="">
                      Sélectionner une catégorie
                    </option>

                    {categories.map(
                      (category) => (

                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>

                      )
                    )}

                  </select>

                </div>

              </div>


              {/* Unité + prix */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    Unité *
                  </label>

                  <select
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      px-3
                      py-3
                      text-sm
                      outline-none
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  >

                    <option value="">
                      Unité
                    </option>

                    {units.map((unit) => (

                      <option
                        key={unit}
                        value={unit}
                      >
                        {unit}
                      </option>

                    ))}

                  </select>

                </div>


                <div>

                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    Prix *
                  </label>

                  <input
                    name="current_price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      form.current_price
                    }
                    onChange={handleChange}
                    required
                    placeholder="0"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      px-3
                      py-3
                      text-sm
                      outline-none
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />

                  <p className="mt-1 text-[11px] text-text-secondary">
                    FCFA
                  </p>

                </div>

              </div>


              {/* Fournisseur */}

              <div>

                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Fournisseur
                </label>

                <select
                  name="supplier_id"
                  value={
                    form.supplier_id
                  }
                  onChange={handleChange}
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
                >

                  <option value="">
                    Aucun fournisseur
                  </option>

                  {suppliers.map(
                    (supplier) => (

                      <option
                        key={supplier.id}
                        value={supplier.id}
                      >
                        {
                          supplier.first_name
                        }{" "}
                        {
                          supplier.last_name
                        }
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* Description */}

              <div>

                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={handleChange}
                  rows={3}
                  placeholder="Informations complémentaires..."
                  className="
                    w-full
                    resize-none
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

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  pt-2
                  sm:flex-row
                  sm:justify-end
                "
              >

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
                    : editingProduct
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

export default Products