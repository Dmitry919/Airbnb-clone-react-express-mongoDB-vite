import axios from "axios";
import React, { useEffect, useState } from "react";

const IndexPage = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get("/places").then((respons) => {
            setPlaces(respons.data);
            console.log(respons.data);
        });
    }, []);

    return (
        <div className=" mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {places.length > 0 &&
                places.map((item) => (
                    <div key={item._id}>
                        <div className="mb-2 flex rounded-2xl bg-gray-500">
                            {item.photos?.[0] && (
                                <img
                                    className="rounded-2xl object-cover aspect-square"
                                    src={
                                        "http://localhost:9001/uploads/" +
                                        item.photos?.[0]
                                    }
                                    alt=""
                                />
                            )}
                        </div>
                        <h3 className="font-bold">{item.address}</h3>
                        <h2 className="text-sm truncate text-gray-500">
                            {item.title}
                        </h2>
                        <div className="mt-1">
                            <span className="font-bold">
                                ${item.price} per night
                            </span>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default IndexPage;
