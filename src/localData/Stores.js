
export const currentStores =[
    {
        id: 1,
        name: "Simple Store",
        address: {
            streetNumber:"0",
            streetName:"Street Name",
            city:"Simple City D.C",
            state:"Simple Country",
            zipCode:"31000",
        },
        location: {
            latitude:1,
            longitude:2,
        },
        contactPhone: "+33 123456",
        imageUrl:import.meta.env.VITE_APP_URL_API+"/store1.jpeg"
    },
    {
        id: 2,
        name: "Neo store",
        address: {
            streetNumber:"0",
            streetName:"Street Name",
            city:"Neo City",
            state:"Neo Country",
            zipCode:"31000",
        },
        location: {
            latitude:1,
            longitude:2,
        },
        contactPhone: "+33 123456",
        imageUrl:import.meta.env.VITE_APP_URL_API+"/store2.jpeg"
    },
    
]
