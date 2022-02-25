app.component('review-form', {
    template:
    /*html*/
    `
    <form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a review</h3>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
  
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
  
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>

        <input class="button" type="submit" value="Submit">
        <p v-if="isError" class="error-msg">{{ submitMessage }}</p>
        <p v-if="isSuccess" class="success-msg">{{ submitMessage }}</p>
    </form>
    `,
    data() {
        return {
            name: '',
            review: '',
            rating: null,
            submitMessage: '',
            isError: false,
            isSuccess: false
        }
    },
    methods: {
        onSubmit() {
            this.isError = false
            this.isSuccess = false
            if (this.name === '' || this.review === '' || this.rating === null) {
                this.submitMessage = 'Review is incomplete. Please fill out every field'
                this.isError = true
                return
            }
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.isSuccess = true
            this.submitMessage = 'Review successfully submitted';

            this.name = ''
            this.review = ''
            this.rating = null
        }
    }
})