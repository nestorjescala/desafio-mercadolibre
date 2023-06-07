const addSeparators = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const formatPrice = (price) => {
    return `${price.currency === 'CL' ? '$ ' : 'U$S '}${addSeparators(price.amount)}`
};