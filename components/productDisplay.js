app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image" :alt="productName">
            </div>
            <div class="product-info">
                <div class="product-promo-meta">
                    <!-- <p v-if="inventory>10">In Stock</p>
                    <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
                    <p v-else>Out of Stock</p> -->
                    <p v-if="inStock">In Stock</p>
                    <p v-else>Out of Stock</p>
                    <p v-if="onSale">On Sale</p>
                </div>
                <p>Shipping: {{ shipping }}</p>
                <h1>{{ title }}</h1>
                <p>{{ productDesc }}</p>
                <product-details :details="details"></product-details>
                <ul class="size-variation">
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>
                <div class="variations">
                    <div 
                        class="color-circle" 
                        v-for="(variant, index) in variants" 
                        :key="variant.id" 
                        @mouseover="updateVariant(index)"
                        :style="{ backgroundColor: variant.color }">
                    </div>
                </div>
                <a :href="productExtUrl" target="_blank">External Url</a>
                <button class="button" :class="{ disabledButton: !inStock }" v-on:click="addToCart">Add to Cart</button>
                <button class="button" :class="{ disabledButton: !inStock }" @click="removeFromCart">Remove from Cart</button>
            </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>
    `,
    data(){
        return {
            brandName: 'Kochu Mia',
            productName: 'Socks',
            productDesc: 'mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur',
            selectedVariant: 0,
            productExtUrl: 'https://google.com/',
            inventory: 0,
            onSale: true,
            details: ['50% cotton', 'Test1', 'Test2'],
            variants: [
                { 'id': 01, color: '#3ca870', image: 'assets/images/socks_green.jpeg', quantity: 50 },
                { 'id': 02, color: '#586b85', image: 'assets/images/socks_blue.jpeg', quantity: 0 }
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brandName + ' ' + this.productName
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if( this.premium ) {
                return 'Free'
            }
            return 2.99
        }
    }
})