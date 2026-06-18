document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('productsGrid');
    
    
    fetchProducts(productsGrid);
});

async function fetchProducts(gridElement){
    if (!gridElement) return;

    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Failed to retrieve inventory data.');
        
        const products = await response.json();
        renderProducts(products, gridElement);
    } catch (error){
        console.error('Error loading BakeBox inventory:', error);
        gridElement.innerHTML = `<p class="text-red-500 text-center col-span-full">Unable to load pastries right now. Please try refreshing.</p>`;
    }
}