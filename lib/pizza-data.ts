export type PizzaSize = "small" | "medium" | "large"

export interface Pizza {
  id: string
  name: string
  description: string
  image: string
  category: string
  prices: Record<PizzaSize, number>
  rating: number
  reviewCount: number
  ingredients: string[]
  isPopular?: boolean
  isNew?: boolean
  spiceLevel?: number
}

export interface Review {
  id: string
  pizzaId: string
  userName: string
  rating: number
  comment: string
  date: string
  avatar: string
  photoUrl?: string
}

export interface CartItem {
  pizza: Pizza
  size: PizzaSize
  quantity: number
}

export const categories = [
  { id: "all", name: "All Pizzas", icon: "grid" },
  { id: "classic", name: "Classic", icon: "star" },
  { id: "specialty", name: "Specialty", icon: "chef-hat" },
  { id: "veggie", name: "Vegetarian", icon: "leaf" },
  { id: "spicy", name: "Spicy", icon: "flame" },
  { id: "seafood", name: "Seafood", icon: "fish" },
]

export const pizzas: Pizza[] = [
  {
    id: "margherita",
    name: "Margherita",
    description:
      "The timeless classic with San Marzano tomato sauce, fresh mozzarella di bufala, fragrant basil leaves, and a drizzle of extra virgin olive oil.",
    image: "/images/margherita.jpg",
    category: "classic",
    prices: { small: 199, medium: 349, large: 499 },
    rating: 4.8,
    reviewCount: 234,
    ingredients: ["Tomato Sauce", "Mozzarella", "Fresh Basil", "Olive Oil"],
    isPopular: true,
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    description:
      "Loaded with premium pepperoni that curls into crispy cups, layered over our signature tomato sauce and melted mozzarella cheese.",
    image: "/images/pepperoni.jpg",
    category: "classic",
    prices: { small: 249, medium: 399, large: 549 },
    rating: 4.9,
    reviewCount: 312,
    ingredients: ["Tomato Sauce", "Mozzarella", "Pepperoni"],
    isPopular: true,
  },
  {
    id: "bbq-chicken",
    name: "BBQ Chicken",
    description:
      "Smoky BBQ sauce base topped with seasoned grilled chicken, caramelized red onions, fresh cilantro, and a blend of mozzarella and gouda.",
    image: "/images/bbq-chicken.jpg",
    category: "specialty",
    prices: { small: 299, medium: 449, large: 599 },
    rating: 4.7,
    reviewCount: 189,
    ingredients: [
      "BBQ Sauce",
      "Grilled Chicken",
      "Red Onions",
      "Cilantro",
      "Gouda",
    ],
    isPopular: true,
  },
  {
    id: "veggie-supreme",
    name: "Veggie Supreme",
    description:
      "A garden-fresh medley of bell peppers, mushrooms, black olives, red onions, tomatoes, and baby spinach over our classic tomato sauce.",
    image: "/images/veggie.jpg",
    category: "veggie",
    prices: { small: 229, medium: 379, large: 529 },
    rating: 4.6,
    reviewCount: 156,
    ingredients: [
      "Tomato Sauce",
      "Bell Peppers",
      "Mushrooms",
      "Olives",
      "Onions",
      "Spinach",
    ],
  },
  {
    id: "meat-lovers",
    name: "Meat Lovers",
    description:
      "The ultimate meat feast with Italian sausage, crispy bacon, smoked ham, pepperoni, and seasoned ground beef on a bed of melted cheese.",
    image: "/images/meat-lovers.jpg",
    category: "specialty",
    prices: { small: 329, medium: 479, large: 649 },
    rating: 4.8,
    reviewCount: 267,
    ingredients: [
      "Tomato Sauce",
      "Sausage",
      "Bacon",
      "Ham",
      "Pepperoni",
      "Ground Beef",
    ],
    isPopular: true,
  },
  {
    id: "hawaiian",
    name: "Hawaiian",
    description:
      "A tropical twist with sweet pineapple chunks and savory ham pieces atop our signature tomato sauce and melted mozzarella.",
    image: "/images/hawaiian.jpg",
    category: "classic",
    prices: { small: 229, medium: 379, large: 529 },
    rating: 4.4,
    reviewCount: 198,
    ingredients: ["Tomato Sauce", "Mozzarella", "Ham", "Pineapple"],
  },
  {
    id: "four-cheese",
    name: "Quattro Formaggi",
    description:
      "An indulgent blend of four premium cheeses: mozzarella, gorgonzola, parmesan, and fontina, creating a rich and creamy masterpiece.",
    image: "/images/four-cheese.jpg",
    category: "specialty",
    prices: { small: 279, medium: 429, large: 579 },
    rating: 4.7,
    reviewCount: 145,
    ingredients: ["Mozzarella", "Gorgonzola", "Parmesan", "Fontina"],
    isNew: true,
  },
  {
    id: "mushroom-truffle",
    name: "Mushroom Truffle",
    description:
      "Wild forest mushrooms with aromatic truffle oil, creamy fontina cheese, and fresh thyme on a white garlic cream base.",
    image: "/images/mushroom.jpg",
    category: "veggie",
    prices: { small: 329, medium: 479, large: 649 },
    rating: 4.9,
    reviewCount: 112,
    ingredients: [
      "Garlic Cream",
      "Wild Mushrooms",
      "Truffle Oil",
      "Fontina",
      "Thyme",
    ],
    isNew: true,
  },
  {
    id: "spicy-diavola",
    name: "Spicy Diavola",
    description:
      "For the bold: spicy Italian salami, fiery chili flakes, roasted hot peppers, and nduja spread over our signature tomato sauce.",
    image: "/images/spicy-diavola.jpg",
    category: "spicy",
    prices: { small: 279, medium: 429, large: 579 },
    rating: 4.6,
    reviewCount: 178,
    ingredients: [
      "Tomato Sauce",
      "Spicy Salami",
      "Chili Flakes",
      "Hot Peppers",
      "Nduja",
    ],
    spiceLevel: 3,
  },
  {
    id: "seafood-delight",
    name: "Seafood Delight",
    description:
      "A coastal-inspired pizza with succulent shrimp, tender calamari, plump mussels, roasted garlic, and fresh parsley on white sauce.",
    image: "/images/seafood.jpg",
    category: "seafood",
    prices: { small: 349, medium: 499, large: 699 },
    rating: 4.5,
    reviewCount: 89,
    ingredients: [
      "White Sauce",
      "Shrimp",
      "Calamari",
      "Mussels",
      "Garlic",
      "Parsley",
    ],
  },
  {
    id: "pesto-chicken",
    name: "Pesto Chicken",
    description:
      "Vibrant basil pesto base with grilled chicken, sun-dried tomatoes, toasted pine nuts, and fresh mozzarella.",
    image: "/images/pesto.jpg",
    category: "specialty",
    prices: { small: 279, medium: 429, large: 579 },
    rating: 4.7,
    reviewCount: 134,
    ingredients: [
      "Basil Pesto",
      "Grilled Chicken",
      "Sun-Dried Tomatoes",
      "Pine Nuts",
      "Mozzarella",
    ],
  },
  {
    id: "veggie-pesto",
    name: "Garden Pesto",
    description:
      "Fresh pesto sauce with roasted zucchini, artichoke hearts, cherry tomatoes, red onions, and crumbled goat cheese.",
    image: "/images/veggie.jpg",
    category: "veggie",
    prices: { small: 249, medium: 399, large: 549 },
    rating: 4.5,
    reviewCount: 98,
    ingredients: [
      "Basil Pesto",
      "Zucchini",
      "Artichoke",
      "Cherry Tomatoes",
      "Goat Cheese",
    ],
  },
]

export const reviews: Review[] = [
  {
    id: "r1",
    pizzaId: "margherita",
    userName: "Rahul Sharma",
    rating: 5,
    comment:
      "Best Margherita I have ever had! The fresh basil and mozzarella are absolutely divine. Will order again!",
    date: "2026-01-15",
    avatar: "RS",
  },
  {
    id: "r2",
    pizzaId: "margherita",
    userName: "Priya Patel",
    rating: 5,
    comment:
      "Perfect balance of flavors. The crust is thin and crispy just how I like it. Highly recommend!",
    date: "2026-01-20",
    avatar: "PP",
  },
  {
    id: "r3",
    pizzaId: "pepperoni",
    userName: "Amit Kumar",
    rating: 5,
    comment:
      "The pepperoni cups are perfectly crispy. This is my go-to pizza every Friday night!",
    date: "2026-02-01",
    avatar: "AK",
  },
  {
    id: "r4",
    pizzaId: "pepperoni",
    userName: "Neha Gupta",
    rating: 4,
    comment:
      "Great pizza with generous toppings. The cheese pull is amazing! Delivery was quick too.",
    date: "2026-02-05",
    avatar: "NG",
  },
  {
    id: "r5",
    pizzaId: "bbq-chicken",
    userName: "Vikram Singh",
    rating: 5,
    comment:
      "The BBQ sauce is smoky and the chicken is so tender. A must-try for BBQ lovers!",
    date: "2026-01-28",
    avatar: "VS",
  },
  {
    id: "r6",
    pizzaId: "meat-lovers",
    userName: "Sneha Reddy",
    rating: 5,
    comment:
      "If you love meat, this is your pizza! Every bite is packed with flavor. The bacon is perfectly crispy.",
    date: "2026-02-10",
    avatar: "SR",
  },
  {
    id: "r7",
    pizzaId: "mushroom-truffle",
    userName: "Tanvir Rahman",
    rating: 5,
    comment:
      "The truffle oil elevates this pizza to restaurant quality. The mushrooms are earthy and delicious!",
    date: "2026-02-08",
    avatar: "TR",
  },
  {
    id: "r8",
    pizzaId: "four-cheese",
    userName: "Meera Iyer",
    rating: 4,
    comment:
      "Cheese lovers dream! The gorgonzola adds a beautiful tang. Rich and satisfying.",
    date: "2026-01-25",
    avatar: "MI",
  },
  {
    id: "r9",
    pizzaId: "spicy-diavola",
    userName: "Rajesh Verma",
    rating: 5,
    comment:
      "Finally a pizza with real heat! The nduja spread is incredible. Not for the faint of heart!",
    date: "2026-02-03",
    avatar: "RV",
  },
  {
    id: "r10",
    pizzaId: "veggie-supreme",
    userName: "Ananya Das",
    rating: 4,
    comment:
      "So many fresh veggies! Great option for vegetarians. The mushrooms are perfectly cooked.",
    date: "2026-02-07",
    avatar: "AD",
  },
]

export function getPizzaById(id: string): Pizza | undefined {
  return pizzas.find((p) => p.id === id)
}

export function getReviewsByPizzaId(pizzaId: string): Review[] {
  return reviews.filter((r) => r.pizzaId === pizzaId)
}

export function getPizzasByCategory(category: string): Pizza[] {
  if (category === "all") return pizzas
  return pizzas.filter((p) => p.category === category)
}

export function formatPrice(price: number): string {
  return `\u20B9${price}`
}
