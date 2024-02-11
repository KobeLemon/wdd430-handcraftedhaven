const { faker } = require('@faker-js/faker');
const { randomInt } = require('crypto');
require('crypto');
const ArtisanId = {value: 1};

const HandcraftedHavenCategories = [
    {
        id: "1",
        name: "Wood Carving"
    },
    {
        id: "2",
        name: "Other"
    },
    {
        id: "3",
        name: "Metalwork"
    },
    {
        id: "4",
        name: "Sculptures"
    },
    {
        id: "5",
        name: "Carpentry"
    },
    {
        id: "6",
        name: "Doll Making"
    },
    {
        id: "7",
        name: "Pottery"
    },
    {
        id: "8",
        name: "Jewelry"
    },
    {
        id: "9",
        name: "Glass Work"
    }
]

const HandcraftedHavenProducts = [
]

const HandcraftedHavenArtisans = [
]

const HandcraftedHavenCollections = [
]

const HandcraftedHavenUsers = [
]

const HandcraftedHavenReviews = [
]

const goodReviews = [
    "It was good, would buy again.",
    "It made a great gift!",
    "Extremely fine craftsmanship!",
    "Can't wait to get another one!",
    "I loved this craft, thank you so much",
    "Swift shipping, good customer service, and easy payment."
]
const badReviews = [
    "Wow, just wow, and not in a good way.",
    "This was disappointing to say the least, I mean... c'mon.",
    "Would not get again, very disappointing buy.",
    "I rather had not bought this.",
    "One word to describe this craft... pointless.",
    "Would've been great if it ever came."
]

function makeReview(productID){
    const randomMessageInt = randomInt(0,6);
    const randomRating = randomInt(1,6)
    let message;
    if(randomRating > 0 & randomRating < 3) message = badReviews[randomMessageInt]
    else message = goodReviews[randomMessageInt]

    const newReview = {
        productId: productID,
        name: faker.person.fullName(),
        description: message,
        rating: randomRating

    }

    HandcraftedHavenReviews.push(newReview)
}

function makeProduct(collectionString, art_id){
    const newProduct = {
        id: "",
        name: "",
        description: "",
        price: 0,
        rating: 0,
        category: 0,
        collection: "",
        artisan_id:art_id,
        picture: {
            small: "",
            medium: "",
            big: "",
        }
    }

    newProduct.id = crypto.randomUUID()
    newProduct.artisan_id = art_id
    newProduct.name = faker.commerce.productName()
    newProduct.description = faker.commerce.productDescription()
    newProduct.price = faker.commerce.price({min:1, max:200, dec: 2})
    newProduct.rating = randomInt(1, 6)
    newProduct.category = randomInt(1, 10)
    newProduct.collection = collectionString,
    newProduct.picture.small = faker.image.url({height:640, width:640, category:HandcraftedHavenCategories[newProduct.category-1].name.toLowerCase()})
    newProduct.picture.medium = newProduct.picture.small
    newProduct.picture.big = newProduct.picture.small

    makeReview(newProduct.id)
    makeReview(newProduct.id)
    makeReview(newProduct.id)
    makeReview(newProduct.id)
    makeReview(newProduct.id)

    HandcraftedHavenProducts.push(newProduct)

}

function makePerson(){
    gender = ['male', 'female'][randomInt(0, 2)]

    const newCollection = {
        id: crypto.randomUUID(),
        name: "Everything",
    }

    const newUser = {
        id: "",
        username: "",
        email: "",
        password: "123456",
    }

    const newArtisan = {
        id: "",
        name: "",
        description: "",
        collection: "",
        picture: {
            small: "",
            medium: "",
            big: ""
        }
    }

    newUser.id = ArtisanId.value;
    newArtisan.id = ArtisanId.value;
    newArtisan.name = `${faker.person.fullName(gender)}`
    newUser.username = newArtisan.name.replace(/[\s]/gm, "")
    newUser.email = `${newUser.username}@crafts.net`
    newArtisan.collection = newCollection.id;
    newArtisan.description = faker.person.bio()
    const image = faker.image.avatar(width=640, height=640)
    newArtisan.picture.small = image
    newArtisan.picture.medium = image
    newArtisan.picture.big = image
    
    makeProduct(newArtisan.collection,ArtisanId.value)
    makeProduct(newArtisan.collection,ArtisanId.value)
    makeProduct(newArtisan.collection,ArtisanId.value)
    makeProduct(newArtisan.collection,ArtisanId.value)
    makeProduct(newArtisan.collection,ArtisanId.value)

    HandcraftedHavenArtisans.push(newArtisan)
    HandcraftedHavenCollections.push(newCollection)
    HandcraftedHavenUsers.push(newUser)

    ArtisanId.value += 1;
}

function main(){

    makePerson();
    makePerson();
    makePerson();

    makePerson();
    makePerson();
    makePerson();

    makePerson();
    makePerson();
    makePerson();

    HandcraftedHavenArtisans.sort((a, b) => a.id - b.id);
    HandcraftedHavenUsers.sort((a, b) => a.id - b.id);

    console.log(HandcraftedHavenArtisans[HandcraftedHavenUsers.length-1])
    console.log(HandcraftedHavenUsers[HandcraftedHavenUsers.length-1])

    console.log(HandcraftedHavenProducts)
}

main();

module.exports = {
    HandcraftedHavenCategories,
    HandcraftedHavenUsers,
    HandcraftedHavenArtisans,
    HandcraftedHavenCollections,
    HandcraftedHavenProducts,
    HandcraftedHavenReviews,
}