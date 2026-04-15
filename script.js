const productsData = [
    // Взуття
    { id: 1, name: "Чорні шкіряні черевики", price: 28000, image: "images/wboots.png", type: "Взуття", gender: "women", brand: "MM6", color: "Чорний", sizes: ["36", "37", "38", "39"] },
    { id: 2, name: "Білі кросівки Tabi", price: 24500, image: "images/tabi.png", type: "Взуття", gender: "men", brand: "Maison Margiela", color: "Білий", sizes: ["40", "41", "42", "43"] },
    // Одяг
    { id: 3, name: "Темні джинси wide-leg", price: 12400, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80", type: "Одяг", gender: "women", brand: "MM6", color: "Синій", sizes: ["S", "M", "L"] },
    { id: 4, name: "Класична біла сорочка", price: 8500, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80", type: "Одяг", gender: "women", brand: "Maison Margiela", color: "Білий", sizes: ["XS", "S", "M"] },
    { id: 5, name: "Брюки з розрізами", price: 14500, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=400&q=80", type: "Одяг", gender: "women", brand: "MM6", color: "Чорний", sizes: ["S", "M"] },
    { id: 6, name: "Двобортне пальто", price: 42000, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=400&q=80", type: "Одяг", gender: "women", brand: "Maison Margiela", color: "Чорний", sizes: ["M", "L"] },
    { id: 7, name: "Чорна шкіряна куртка", price: 34000, image: "images/jacket.png", type: "Одяг", gender: "men", brand: "MM6", color: "Чорний", sizes: ["M", "L", "XL"] },
    { id: 8, name: "Світлі джинси прямі", price: 11200, image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=400&q=80", type: "Одяг", gender: "men", brand: "MM6", color: "Синій", sizes: ["M", "L"] },
    { id: 9, name: "Світшот з логотипом", price: 9800, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80", type: "Одяг", gender: "men", brand: "Maison Margiela", color: "Білий", sizes: ["S", "M", "L"] },
    { id: 10, name: "Чоловіча футболка", price: 4500, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&q=80", type: "Одяг", gender: "men", brand: "MM6", color: "Чорний", sizes: ["S", "M", "L", "XL"] },
    // Аксесуари
    { id: 11, name: "Шкіряний ремінь", price: 6200, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80", type: "Аксесуари", gender: "men", brand: "Maison Margiela", color: "Чорний", sizes: ["M", "L"] },
    { id: 12, name: "Сумка крос-боді", price: 19000, image: "images/bag.png", type: "Аксесуари", gender: "women", brand: "MM6", color: "Білий", sizes: ["One Size"] },
    { id: 13, name: "Сонцезахисні окуляри", price: 11500, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80", type: "Аксесуари", gender: "women", brand: "Maison Margiela", color: "Чорний", sizes: ["One Size"] },
    // Білизна
    { id: 14, name: "Спортивний топ", price: 3200, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80", type: "Білизна", gender: "women", brand: "MM6", color: "Білий", sizes: ["XS", "S", "M"] },
    { id: 15, name: "Боксери бавовняні", price: 2100, image: "https://images.unsplash.com/photo-1520330999086-63510526e0e6?auto=format&fit=crop&w=400&q=80", type: "Білизна", gender: "men", brand: "MM6", color: "Чорний", sizes: ["S", "M", "L"] }
];

const app = {
    cart: [],
    currentProduct: null,
    currentGender: null, 
    currentCategory: 'all',

    init() {
        this.bindNavigation();
        this.bindCategorySidebar();
        this.renderCatalog();
        this.updateCartUI();
        
        this.updateNavState('home');
        
        // Handle size selector for product page
        document.querySelectorAll('.size-options button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.size-options button').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });
    },

    bindNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.closest('a').getAttribute('data-target');
                if (target === 'catalog') {
                    // Reset everything if user clicks main Catalog button
                    this.viewCatalog(null); 
                } else {
                    this.navigate(target);
                }
            });
        });
    },

    bindCategorySidebar() {
        const items = document.querySelectorAll('#category-sidebar li');
        items.forEach(li => {
            li.addEventListener('click', (e) => {
                // Remove active classes
                items.forEach(el => el.classList.remove('active'));
                // Set active class
                const target = e.target;
                target.classList.add('active');
                
                this.currentCategory = target.getAttribute('data-category');
                this.renderCatalog();
            });
        });
    },

    viewCatalog(gender) {
        this.currentGender = gender;
        this.currentCategory = 'all'; // reset sidebar
        
        // Reset sidebar UI
        document.querySelectorAll('#category-sidebar li').forEach(el => el.classList.remove('active'));
        document.querySelector('#category-sidebar li[data-category="all"]').classList.add('active');
        
        // Reset filters UI
        document.getElementById('filter-price').value = "";
        document.getElementById('filter-brand').value = "";
        document.getElementById('filter-size').value = "";
        document.getElementById('filter-color').value = "";

        this.renderCatalog();
        this.navigate('catalog');
    },

    applyFilters() {
        this.renderCatalog();
    },

    navigate(viewId) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        const targetView = document.getElementById('view-' + viewId);
        if(targetView) {
            targetView.classList.add('active');
        } else {
            document.getElementById('view-home').classList.add('active');
            viewId = 'home';
        }

        this.updateNavState(viewId);
        window.scrollTo(0, 0);
    },

    updateNavState(viewId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            if(link.getAttribute('data-target') === viewId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    renderCatalog() {
        const grid = document.getElementById('productGrid');
        grid.innerHTML = '';
        
        // Retrieve selected sub-filters
        const priceSort = document.getElementById('filter-price').value;
        const brandFilter = document.getElementById('filter-brand').value;
        const sizeFilter = document.getElementById('filter-size').value;
        const colorFilter = document.getElementById('filter-color').value;

        // Clone array to sort and filter
        let filteredProducts = [...productsData];
        
        // 1. Gender Filter
        if (this.currentGender) {
            filteredProducts = filteredProducts.filter(p => p.gender === this.currentGender);
        }
        
        // 2. Category Sidebar Filter
        if (this.currentCategory !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.type === this.currentCategory);
        }

        // 3. Dropdown Filters
        if (brandFilter) {
            filteredProducts = filteredProducts.filter(p => p.brand === brandFilter);
        }
        
        // Match if the product array of sizes includes the size selected
        if (sizeFilter) {
            filteredProducts = filteredProducts.filter(p => p.sizes.includes(sizeFilter));
        }

        if (colorFilter) {
            filteredProducts = filteredProducts.filter(p => p.color === colorFilter);
        }

        // 4. Sort Price
        if (priceSort === 'asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (priceSort === 'desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }
        
        // Render
        if(filteredProducts.length === 0) {
            grid.innerHTML = '<p style="grid-column: span 3; color: #777;">Товарів не знайдено, спробуйте змінити фільтри.</p>';
        }

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p style="font-size: 11px; margin-bottom: 5px; opacity: 0.6;">${product.type} / ${product.brand}</p>
                <p>${product.price.toLocaleString('uk-UA')} ₴</p>
            `;
            card.onclick = () => this.viewProduct(product.id);
            grid.appendChild(card);
        });
    },

    viewProduct(id) {
        this.currentProduct = productsData.find(p => p.id === id);
        if(!this.currentProduct) return;

        // Update basic text
        document.getElementById('detail-title').innerText = this.currentProduct.name;
        document.getElementById('detail-price').innerText = `${this.currentProduct.price.toLocaleString('uk-UA')} ₴`;
        
        // Setup allowable mock sizes in the product details page
        const sizesDiv = document.querySelector('.size-options');
        sizesDiv.innerHTML = '';
        this.currentProduct.sizes.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.innerText = s;
            if(idx === 0) btn.classList.add('selected'); // select first by default
            btn.onclick = (e) => {
                sizesDiv.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
            };
            sizesDiv.appendChild(btn);
        });

        // Add correct images
        const imagesContainer = document.querySelector('.product-images');
        imagesContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = this.currentProduct.image;
        img.alt = this.currentProduct.name;
        imagesContainer.appendChild(img);

        this.navigate('product');
    },

    addToCart() {
        if(!this.currentProduct) return;
        
        const sizeEl = document.querySelector('.size-options button.selected');
        const size = sizeEl ? sizeEl.innerText : 'One Size';
        
        this.cart.push({
            id: Date.now(),
            productId: this.currentProduct.id,
            name: this.currentProduct.name,
            price: this.currentProduct.price,
            image: this.currentProduct.image,
            size: size
        });
        
        this.updateCartUI();
        
        const btn = document.querySelector('.product-details .btn-primary');
        const oldText = btn.innerText;
        btn.innerText = "Додано!";
        btn.style.background = "#4caf50";
        setTimeout(() => {
            btn.innerText = oldText;
            btn.style.background = "";
        }, 1500);
    },

    removeFromCart(cartId) {
        this.cart = this.cart.filter(item => item.id !== cartId);
        this.updateCartUI();
    },

    updateCartUI() {
        const badge = document.getElementById('cart-badge');
        badge.innerText = this.cart.length;
        if(this.cart.length > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }

        const cartList = document.getElementById('cart-list');
        const emptyMsg = cartList.querySelector('.empty-msg');
        
        Array.from(cartList.children).forEach(child => {
            if(!child.classList.contains('empty-msg')) {
                cartList.removeChild(child);
            }
        });

        if(this.cart.length === 0) {
            if(emptyMsg) emptyMsg.style.display = 'block';
        } else {
            if(emptyMsg) emptyMsg.style.display = 'none';
            
            this.cart.forEach(item => {
                const el = document.createElement('div');
                el.className = 'cart-item';
                el.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Розмір: ${item.size}</p>
                        <p>Ціна: ${item.price.toLocaleString('uk-UA')} ₴</p>
                    </div>
                    <button class="cart-item-remove" onclick="app.removeFromCart(${item.id})">Видалити ✕</button>
                `;
                cartList.appendChild(el);
            });
        }

        const total = this.cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('cart-count').innerText = this.cart.length;
        document.getElementById('cart-total').innerText = `${total.toLocaleString('uk-UA')} ₴`;
    },

    completeOrder() {
        if(this.cart.length === 0) {
            alert('Ваш кошик порожній!');
            return;
        }
        alert('Дякуємо за замовлення!');
        this.cart = [];
        this.updateCartUI();
        this.navigate('home');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
