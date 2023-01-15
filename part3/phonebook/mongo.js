const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://dbAdmin:${password}@cluster0.xv6ij.mongodb.net/phonebook?retryWrites=true&w=majority`

const peopleSchema = new mongoose.Schema({
    name: String,
    number: String
})

const People = mongoose.model('People', peopleSchema)

if(process.argv.length === 3){
    mongoose
        .connect(url)
        .then(() => {
            People.find({}).then(result => {
                console.log('phonebook:')
                result.forEach(person => {
                    console.log(person.name, person.number)
                })
                mongoose.connection.close()
            })
        }).catch(error => {
            console.log(error)
        })

}else if(process.argv.length === 5){
    const name = process.argv[3]
    const number = process.argv[4]
    mongoose
        .connect(url)
        .then(() => {
            const person = new People({
                name: name,
                number: number
            })

            return person.save()
        })
        .then(() => {
            console.log(`added ${name} number ${number} to the phonebook`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}





