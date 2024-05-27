document.addEventListener("DOMContentLoaded", function() {
    // Page load animation
    setTimeout(function() {
        const elementsToAnimate = document.querySelectorAll('.animate-fade-in');
        elementsToAnimate.forEach(element => {
            element.classList.add('fade-in');
        });
    }, 500); // Adjust the delay as needed

    // Typing animation for "Welcome to LapTopia" text
    const typingText = document.querySelector('.animate-typing h1');
    const text = "Welcome to LapTopia!";
    let index = 0;

    function type() {
        if (index < text.length) {
            typingText.textContent = text.substr(0, index + 1);
            index++;
            setTimeout(type, 100); // Adjust typing speed if needed
        }
    }

    type();

    // Create particles
    const particleContainer = document.querySelector('.particle-background');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 5 + 3}px`; // Random size
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`; // Random horizontal position
        particle.style.animationDuration = `${Math.random() * 5 + 3}s`; // Random animation duration
        particleContainer.appendChild(particle);
    }

    const products = [
        // Dell products
        {
            name: "Dell XPS 13",
            description: "13.3-inch laptop designed with precision engineered details, from stunning materials to minimal footprint, with true unrivaled performance and superior visuals.",
            price: "$999",
            category: "dell",
            image: "images/dellone.jpg"
        },
        {
            name: "Dell Inspiron 15",
            description: "15.6-inch laptop with responsive performance in a sleek design with 10th Gen Intel Core processors.",
            price: "$549",
            category: "dell",
            image: "images/delltwo.jpg"
        },
        {
            name: "Dell G5 15",
            description: "15.6-inch gaming laptop with powerful graphics and performance for a seamless gaming experience.",
            price: "$899",
            category: "dell",
            image: "images/dellfour.jpg"
        },
        {
            name: "Dell Latitude 7400",
            description: "14-inch business laptop with superior battery life and innovative features for on-the-go productivity.",
            price: "$1299",
            category: "dell",
            image: "images/dellthree.jpg"
        },
        // Apple products
        {
            name: "Apple MacBook Pro 16",
            description: "16-inch MacBook Pro with Touch Bar, powerful processors, and the largest memory capacity.",
            price: "$2399",
            category: "apple",
            image: "images/appleone.jpg"
        },
        {
            name: "Apple MacBook Air",
            description: "13.3-inch MacBook Air with Retina display and the latest Apple M1 chip for exceptional performance.",
            price: "$999",
            category: "apple",
            image: "images/appletwo.jpg"
        },
        {
            name: "Apple MacBook Pro 13",
            description: "13.3-inch MacBook Pro with Touch Bar and the latest Apple M1 chip for powerful performance.",
            price: "$1299",
            category: "apple",
            image: "images/applethree.jpg"
        },
        {
            name: "Apple MacBook",
            description: "12-inch MacBook with Retina display, featuring a thin and light design and long battery life.",
            price: "$1299",
            category: "apple",
            image: "images/applefour.jpg"
        },
        // HP products
        {
            name: "HP Spectre x360",
            description: "13.3-inch convertible laptop featuring a cutting-edge design with superb performance and long battery life.",
            price: "$1199",
            category: "hp",
            image: "images/hpone.jpg"
        },
        {
            name: "HP Envy 13",
            description: "13.3-inch laptop with powerful performance and a stunning display in a sleek and portable design.",
            price: "$999",
            category: "hp",
            image: "images/hptwo.jpg"
        },
        {
            name: "HP Pavilion 15",
            description: "15.6-inch laptop with a balance of performance and functionality, perfect for everyday tasks.",
            price: "$649",
            category: "hp",
            image: "images/hpthree.jpg"
        },
        {
            name: "HP Elite Dragonfly",
            description: "13.3-inch business laptop with premium design, powerful performance, and long battery life.",
            price: "$1599",
            category: "hp",
            image: "images/hpfour.webp"
        },
        // Lenovo products
        {
            name: "Lenovo ThinkPad X1 Carbon",
            description: "14-inch business laptop with an ultra-light and ultra-thin design, offering top-notch performance and durability.",
            price: "$1499",
            category: "lenovo",
            image: "images/lenovoone.jpg"
        },
        {
            name: "Lenovo Yoga C940",
            description: "14-inch convertible laptop with a premium design, powerful performance, and versatile functionality.",
            price: "$1399",
            category: "lenovo",
            image: "images/lenovotwo.jpg"
        },
        {
            name: "Lenovo Legion 5",
            description: "15.6-inch gaming laptop with powerful graphics, high-refresh-rate display, and robust cooling system.",
            price: "$1199",
            category: "lenovo",
            image: "images/lenovothree.jpg"
        },
        {
            name: "Lenovo IdeaPad 3",
            description: "15.6-inch laptop with reliable performance and a range of features for everyday computing needs.",
            price: "$499",
            category: "lenovo",
            image: "images/lenovofour.jpg"
        }
    ];

	const productsContainer = document.getElementById("featured");

		function displayProducts(productsToDisplay) {
			productsContainer.innerHTML = "";
			productsToDisplay.forEach(product => {
				const productCard = document.createElement("div");
				productCard.classList.add("col-md-3", "product-card");

				productCard.innerHTML = `
					<div class="card">
						<img src="${product.image}" class="card-img-top" alt="${product.name}">
						<div class="card-body">
							<h5 class="card-title">${product.name}</h5>
							<p class="card-text">${product.description}</p>
							<p class="card-text price">${product.price}</p>
							<a href="#" class="btn btn-add-to-cart" data-product='${JSON.stringify(product)}'>Add to Cart</a>
						</div>
					</div>
				`;

				productsContainer.appendChild(productCard);
			});
		}
		

    // Initial display of all products
    displayProducts(products);
	
    // Add to Cart functionality
	document.addEventListener('click', function(event) {
		if (event.target.classList.contains('btn-add-to-cart')) {
			event.preventDefault();
			const product = JSON.parse(event.target.getAttribute('data-product'));
			addToCart(product);
		}
	});

	function addToCart(product) {
		let cart = JSON.parse(localStorage.getItem('cart')) || [];
		cart.push(product);
		localStorage.setItem('cart', JSON.stringify(cart));
		alert('Product added to cart!');
	}

    // Filter products by category
    const categoryLinks = document.querySelectorAll('.filter-category');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = this.dataset.category;
            if (category === 'all') {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === category);
                displayProducts(filteredProducts);
            }
        });
    });

    // Sort products
    const sortOptions = document.getElementById("sort-options");
    sortOptions.addEventListener("change", function() {
        const sortBy = this.value;
        let sortedProducts = [...products];
        if (sortBy === "price-asc") {
            sortedProducts.sort((a, b) => parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1)));
        } else if (sortBy === "price-desc") {
            sortedProducts.sort((a, b) => parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1)));
        }
        displayProducts(sortedProducts);
    });
});