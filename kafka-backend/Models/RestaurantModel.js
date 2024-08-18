module.exports = mongoose => {
    const Restaurant = mongoose.model(
        "restaurant",
        mongoose.Schema(
            {
                email: { type: String },
                password: { type: String },
                name: { type: String },
                about: { type: String, default: " About the restaurant" },
                open: { type: String },
                close: { type: String },
                isPickup: { type: Boolean },
                isDelivery: { type: Boolean },
                phoneno: { type: String },
                image: { type: String },
                street: { type: String },
                city: { type: String },
                state: { type: String },
                country: { type: String },
                zipcode: { type: String },
                dishes: [
                    {
                        name: { type: String },
                        ingredient: { type: String },
                        price: { type: Number },
                        description: { type: String },
                        category: { type: String },
                        type: { type: String },
                        image: { type: String }
                    }

                ]

            },
            { timestamps: true },
            { versionKey: false }
        )
    );
    return Restaurant;
};