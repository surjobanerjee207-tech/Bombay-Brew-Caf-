/* ==========================================
   Bombay Brew Café - Interactive Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Effects: Navbar ---
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    scrollSpy();
  });

  // --- Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between burger and close
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars-staggered';
    }
  });

  // Close mobile menu when clicking a link
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
    });
  });

  // --- Scroll Spy (Active Nav Link) ---
  const sections = document.querySelectorAll('section');
  
  function scrollSpy() {
    let current = '';
    const scrollPos = window.scrollY + 120; // offset for navbar height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  }

  // --- Menu Database ---
  const menuData = {
    drinks: {
      title: "Coffee & Tea",
      icon: "fa-solid fa-mug-hot",
      description: "Carefully selected beans and premium spices, brewed to perfection.",
      items: [
        {
          title: "Bombay Cutting Chai",
          price: "₹60",
          description: "Strong local black tea brewed with fresh milk, cardamom, ginger, and our secret masala blend."
        },
        {
          title: "Classic Cold Coffee",
          price: "₹140",
          description: "Rich, creamy, and frothy sweetened local-style iced coffee, served chilled."
        },
        {
          title: "Artisanal Cappuccino",
          price: "₹180",
          description: "Double shot of single-origin Chikmagalur arabica espresso with silky steamed milk."
        },
        {
          title: "Rose & Cardamom Iced Latte",
          price: "₹210",
          description: "A soothing floral espresso drink made with natural organic rose syrup, cardamom, and cold milk."
        },
        {
          title: "Spiced Masala Soda",
          price: "₹110",
          description: "Tangy Indian spice mix, black salt, fresh mint, and lime topped with fizzy club soda."
        }
      ]
    },
    burgers: {
      title: "Sandwiches & Burgers",
      icon: "fa-solid fa-burger",
      description: "Indian street-food style sandwiches and creative fusion craft burgers.",
      items: [
        {
          title: "Bombay Masala Grill Sandwich",
          price: "₹160",
          description: "Toasted sandwich filled with spiced mashed potatoes, cucumber, tomato, onions, coriander chutney, and melting cheese."
        },
        {
          title: "The Great Vada Pav Burger",
          price: "₹190",
          description: "Gourmet spiced potato dumpling fried crisp, served in a toasted brioche bun with garlic chili crumble and sweet chutney."
        },
        {
          title: "Tandoori Paneer Sliders",
          price: "₹210",
          description: "Three mini buns stuffed with coal-smoked tandoori cottage cheese cubes, pickled onions, and mint yogurt spread."
        },
        {
          title: "Crispy Tandoori Chicken Club",
          price: "₹240",
          description: "A double-decker sandwich loaded with shredded tandoori chicken, fried egg, lettuce, tomatoes, and garlic aioli."
        }
      ]
    },
    pizza: {
      title: "Artisanal Pizza",
      icon: "fa-solid fa-pizza-slice",
      description: "Fresh wood-fired thin crust pizzas featuring a harmony of cheese and local spices.",
      items: [
        {
          title: "Spicy Paneer Tikka Pizza",
          price: "₹380",
          description: "Clay-oven roasted paneer chunks, colored bell peppers, red onions, fresh coriander, and a drizzle of spicy mint chutney."
        },
        {
          title: "Classic Margherita",
          price: "₹320",
          description: "Simplicity at its best: premium marinara sauce, fresh mozzarella cheese, olive oil, and aromatic basil leaves."
        },
        {
          title: "Chicken Tikka Makhani Pizza",
          price: "₹420",
          description: "Succulent clay-oven grilled chicken tikka, rich butter chicken makhani sauce base, red onions, and mozzarella."
        },
        {
          title: "Garden Veggie & Chili Feast",
          price: "₹350",
          description: "Loaded with black olives, button mushrooms, baby corn, sweet corn, green chilies, and mozzarella."
        }
      ]
    },
    maincourse: {
      title: "Main Course & Desserts",
      icon: "fa-solid fa-utensils",
      description: "Hearty, comforting plates and signature fusion sweets to satisfy your cravings.",
      items: [
        {
          title: "Butter Chicken & Garlic Naan Platter",
          price: "₹450",
          description: "Our signature boneless chicken tikka cooked in a creamy tomato-cashew butter sauce, served with hot clay-oven garlic naan."
        },
        {
          title: "Slow-Cooked Dal Makhani & Basmati Rice",
          price: "₹340",
          description: "Black lentils simmered overnight on slow coal embers with butter and cream, served with fragrant steamed basmati rice."
        },
        {
          title: "Sizzling Chocolate Brownie",
          price: "₹260",
          description: "Warm homemade walnut fudge brownie served on a hot sizzling iron plate, topped with vanilla bean ice cream and hot chocolate fudge."
        },
        {
          title: "Saffron Gulab Jamun Cheesecake",
          price: "₹280",
          description: "Baked cream-cheese cake with a cardamom biscuit base, stuffed with warm mini gulab jamuns and topped with dry rose petals."
        }
      ]
    }
  };

  // --- Modal Logic ---
  const menuCards = document.querySelectorAll('.menu-card');
  const menuModal = document.getElementById('menuModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalItemsList = document.getElementById('modalItemsList');

  // Open Modal
  menuCards.forEach(card => {
    card.addEventListener('click', () => {
      const categoryKey = card.getAttribute('data-category');
      const categoryData = menuData[categoryKey];

      if (categoryData) {
        // Populate modal data
        modalIcon.innerHTML = `<i class="${categoryData.icon}"></i>`;
        modalTitle.textContent = categoryData.title;
        modalDescription.textContent = categoryData.description;
        
        // Generate list of items
        let itemsHtml = '';
        categoryData.items.forEach(item => {
          itemsHtml += `
            <div class="menu-item-row">
              <div class="menu-item-header">
                <span class="menu-item-title">${item.title}</span>
                <span class="menu-item-dots"></span>
                <span class="menu-item-price">${item.price}</span>
              </div>
              <p class="menu-item-desc">${item.description}</p>
            </div>
          `;
        });
        modalItemsList.innerHTML = itemsHtml;

        // Activate Modal
        menuModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
      }
    });
  });

  // Close Modal Function
  function closeModal() {
    menuModal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuModal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- Reservation Form Submission ---
  const reservationForm = document.getElementById('reservationForm');
  const formFeedback = document.getElementById('formFeedback');

  reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('resName').value.trim();
    const phone = document.getElementById('resPhone').value.trim();
    const guests = document.getElementById('resGuests').value;
    const time = document.getElementById('resTime').value;

    formFeedback.textContent = "Checking table availability...";
    formFeedback.className = "form-feedback";

    const submitBtn = reservationForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxvPc1HF-c0t_ie79oVavuLgfddWI7TmJyjNW-afbU5d-7ocTozt9gIkqwVE1Kn_-drZw/exec", {
        method: "POST",
        body: JSON.stringify({ fullName: name, phoneNumber: phone, guests, preferredTime: time }),
        headers: { "Content-Type": "text/plain" }
      });

      formFeedback.textContent = `Success! Table for ${guests} reserved for you at ${time}. Welcome, ${name}!`;
      formFeedback.className = "form-feedback success";
      reservationForm.reset();
    } catch (err) {
      formFeedback.textContent = "Something went wrong. Please try again or call us.";
      formFeedback.className = "form-feedback error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }

    setTimeout(() => {
      if (formFeedback.classList.contains('success')) {
        formFeedback.textContent = "";
        formFeedback.className = "form-feedback";
      }
    }, 6000);
  });

});
