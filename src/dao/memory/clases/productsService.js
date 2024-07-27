export default class Products{

    constructor() {
        this.data = [];
    }

    getProducts = async () => {
        try{

            return this.data;

        }catch(error){
            console.log(error);
            return null;
        }
    }


    getProductById = async (productId) => {
        try{
            
            const product = this.data.find(product => product.id === productId);

            return product? product : null;
        }catch(error){
            console.log(error);
            return null;
        }
    }


    createProduct = async (product) => {
        try{
            const newProduct = { _id: this.data.length + 1, ...product };
            this.data.push(newProduct);
            return newProduct;
        }catch(error){
            console.log(error);
            return null;
        }
    }
    

    updateProduct = async (productId, product) => {
        try {
            const index = this.data.findIndex(p => p.id === productId);
            if (index !== -1) {
                this.data[index] = { ...this.data[index], ...product };
                return this.data[index];
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    deleteProduct = async (productId) => {
        try {
            const index = this.data.findIndex(p => p.id === productId);
            if (index !== -1) {
                const deletedProduct = this.data.splice(index, 1);
                return deletedProduct[0];
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}