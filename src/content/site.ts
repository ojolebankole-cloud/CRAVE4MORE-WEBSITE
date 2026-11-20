export const site = {
  name: "Crave4more",
  developer: "Koledev",
  tagline: "A little more to love.",
  palette: {
    ink: "#171311",
    espresso: "#241A16",
    bone: "#F3EBDD",
    parchment: "#E8DDCB",
    copper: "#B65D3B",
    stone: "#786D63",
    olive: "#66705A",
  },
  /** Business facts remain unset until supplied and verified by the owner. */
  business: {
    address: null as string | null,
    phone: null as string | null,
    email: null as string | null,
    openingHours: null as string | null,
    socials: [] as { label: string; href: string }[],
    pickupEnabled: false,
    deliveryEnabled: false,
    paymentProvider: null as string | null,
  },
} as const;
