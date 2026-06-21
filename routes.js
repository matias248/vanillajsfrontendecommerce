import { HomePage } from "./src/pages/homePage.js"
import { ProductList } from "./src/pages/products/productList.ts"
import { StoreDetailPage } from "./src/pages/stores/storeDetails.ts"
import { StoreForm } from "./src/pages/stores/storeForm.ts"
import { StoreList } from "./src/pages/stores/storeList.js"
import { ProductForm } from "./src/pages/products/productForm.ts"
import {ProductDetailPage} from "./src/pages/products/productDetails.ts"
import {ShopTemplate} from "./src/pages/shop/shopTemplate.ts"

export const PATHS = {
    home: {
        path: "/",
        template: HomePage,
    },
    shop: {
        path: "/shop",
        template: HomePage,
    },
    stores: {
        path: "/stores",
        template: StoreList,
    },
    storeCreate: {
        path: "/stores/new",
        template: StoreForm,
    },
    storeDetail: {
        path: "/stores/:id",
        template: StoreDetailPage,
    },
    storeEdit: {
        path: "/stores/:id/edit",
        template: StoreForm,
    },
    products: {
        path: "/stores/:storeId/products",
        template: ProductList,
    },
    productCreate: {
        path: "/stores/:storeId/products/new",
        template: ProductForm,
    },
    productEdit: {
        path: "/stores/:storeId/products/:id/edit",
        template: ProductForm,
    },
    productDetail: {
        path: "/stores/:storeId/products/:productId",
        template: ProductDetailPage,
    },
    shop: {
        path:"/shop",
        template: ShopTemplate,
    }




}
