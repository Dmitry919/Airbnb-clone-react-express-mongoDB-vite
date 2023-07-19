import axios from "axios";
import React, { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [price, setPrice] = useState(100);
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get("/places/" + id).then((respons) => {
            const { data } = respons;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    const inputHeader = (text) => {
        return <h2 className="text-2xl mt-4">{text}</h2>;
    };

    const inputDescription = (text) => {
        return <p className="text-gray-500 text-sm">{text}</p>;
    };

    const preInput = (header, description) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    };

    const sevePlace = async (e) => {
        e.preventDefault();
        const placeData = {
            title,
            address,
            description,
            addedPhotos,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        };

        if (id) {
            await axios.put("/places", { id, ...placeData });
            setRedirect(true);
        } else {
            await axios.post("/places", placeData);
            setRedirect(true);
        }
    };

    if (redirect) {
        return <Navigate to={"/account/places"} />;
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={sevePlace}>
                {preInput(
                    "Title",
                    "title for your place, should be short ahd catchy as in advertisement"
                )}
                <input
                    className="indigo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="title for example: My lovely art"
                />

                {preInput("Address", "Address to this place")}
                <input
                    className="indigo"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="address"
                />

                {preInput("Pfotos", "more = better")}

                <PhotosUploader
                    addedPhotos={addedPhotos}
                    setAddedPhotos={setAddedPhotos}
                />

                {preInput("Description", "description of the place")}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {preInput("Perks", "select all the perkc of your place")}

                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {preInput("Extra info", "house rules, etc")}
                <textarea
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                />

                {preInput(
                    "Check in&out time",
                    "add check in and out times, remember to have some time window for cleaning the room between guests"
                )}

                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input
                            className="indigo"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            type="text"
                            placeholder="14"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input
                            className="indigo"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            type="text"
                            placeholder="11"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input
                            className="indigo"
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.value)}
                            type="number"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input
                            className="indigo"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                        />
                    </div>
                </div>
                <button className="primary my-4">Save</button>
            </form>
        </div>
    );
};

export default PlacesFormPage;
