export default class Carts{

    constructor() {
        this.data = [];
    }

    createCart = async () => {
        try {
            const newCart = { _id: this.data.length + 1, products: [], userId: null };
            this.data.push(newCart);
            return newCart;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getCarts = async () => {
        try {
            return this.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getCartbyId = async (cartId) => {
        try {
            const cart = this.data.find(cart => cart.id === cartId);
            return cart ? cart : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getOneCart = async (cartId) => {
        try {
            const cart = this.data.find(cart => cart.id === cartId);
            return cart ? cart : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    findProductInCart = async (id, pid) => {
        try {
            const cart = this.data.find(cart => cart.id === id);
            if (cart) {
                const product = cart.products.find(product => product.id === pid);
                return product ? product : null;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    updateCart = async (cartId, cart) => {
        try {
            const index = this.data.findIndex(cart => cart.id === cartId);
            if (index !== -1) {
                this.data[index] = { ...this.data[index], ...cart };
                return this.data[index];
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    deleteProductFromCart = async (cartId, productId) => {
        try {
            const cart = this.data.find(cart => cart.id === cartId);
            if (cart) {
                cart.products = cart.products.filter(product => product.id !== productId);
                return cart;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}