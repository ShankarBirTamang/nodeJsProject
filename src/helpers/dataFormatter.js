function formatUserData(data) {
  return {
    address: data.address,
    createdAt: data.createdAt,
    email: data.email,
    id: data.id,
    name: data.name,
    phone: data.phone,
    role: data.role,
  };
}

export function formatProductData(data) {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.createdAt,
    brand: data.brand,
    category: data.category,
    price: data.price,
    description: data.description,
  };
}

export default formatUserData;
