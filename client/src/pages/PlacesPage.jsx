import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";

const PlacesPage = () => {
    const { action } = useParams();

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);

    const [redirect, setRedirect] = useState("");

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

    const addNewPlace = async (e) => {
        e.preventDefault();
        const PlaceData = {
            title,
            address,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
        };

        await axios.post("/places", PlaceData);
        setRedirect("/account/places");
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            {action !== "new" && (
                <div className="text-center">
                    <Link
                        className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                        to={"/account/places/new"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === "new" && (
                <div>
                    <form onSubmit={addNewPlace}>
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

                        {preInput(
                            "Perks",
                            "select all the perkc of your place"
                        )}

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

                        <div className="grid gap-2 sm:grid-cols-3">
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
                                    onChange={(e) =>
                                        setCheckOut(e.target.value)
                                    }
                                    type="text"
                                    placeholder="11"
                                />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">
                                    Max number of guests
                                </h3>
                                <input
                                    className="indigo"
                                    value={maxGuests}
                                    onChange={(e) =>
                                        setMaxGuests(e.target.value)
                                    }
                                    type="number"
                                />
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PlacesPage;
