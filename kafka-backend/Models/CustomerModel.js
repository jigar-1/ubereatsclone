module.exports = mongoose => {
    const Customer = mongoose.model(
        "customer",
        mongoose.Schema(
            {
                email: { type: String },
                password: { type: String },
                name: { type: String, default: "Aaron" },
                about: { type: String },
                dob: { type: Date, },
                nickname: { type: String },
                phoneno: { type: String },
                profilePic: { type: String },
                addresses:
                    [
                        {
                            street: { type: String, default: "190 Ryland Street" },
                            city: { type: String, default: "San Jose" },
                            state: { type: String, default: "California" },
                            country: { type: String, default: "USA" },
                            zipcode: { type: String, default: "95110" }
                        }
                    ]
                ,
                favourites: []
            },
            { timestamps: true },
            {
                versionKey: false
            }
        )
    );
    return Customer;
};