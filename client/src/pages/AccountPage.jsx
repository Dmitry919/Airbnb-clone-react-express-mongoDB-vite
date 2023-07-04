import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

const AccountPage = () => {
    const { user, ready } = useContext(UserContext);

    if (!ready) {
        return "Loding!!!";
    }

    if (ready && !user) {
        return <Navigate to={"/login"} />;
    }

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile";
    }

    const linkClasses = (type = null) => {
        let classes = "py-2 px-6";
        if (type === subpage || (subpage === undefined && type === "profile")) {
            classes += " bg-primary text-white rounded-full";
        }
        return classes;
    };

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses("profile")} to={"/account"}>
                    My profile
                </Link>
                <Link
                    className={linkClasses("bookings")}
                    to={"/account/bookings"}
                >
                    My bookings
                </Link>
                <Link className={linkClasses("places")} to={"/account/places"}>
                    My accommodations
                </Link>
            </nav>
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />
                    <button className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </div>
    );
};

export default AccountPage;
