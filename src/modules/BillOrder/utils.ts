interface Product {
    id: number;
    quantity: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    products: Product[];
}

interface PackageProduct{
    id: number;
    categories: Category[];
}

interface ProductReqDto {
    id: number;
    packageId: number;
    quantity: number;
}

export const handleProductPackage = (packages:PackageProduct[]) => {
    if (!packages.length) return [];

    const productList:ProductReqDto[] = [];

    packages.forEach((packageItem:PackageProduct) => {
        packageItem.categories.forEach(category => {
            category.products.forEach(product => {
                if (product.id) {
                    productList.push({
                        id: product.id,
                        packageId: packageItem.id,
                        quantity: product.quantity || 1
                    })
                }
            });
        });
    });

    return productList;
}

export const isBase64 = (str:string)  =>{
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
}