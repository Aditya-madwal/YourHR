import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../MyContext";
import api from "../api";

function Home() {
  const { me, setMe } = useContext(MyContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        // Fetch user data from the API
        const response = await api.get(`/api/showme`);
        setMe(response.data);
      } catch (error) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );
        } else if (error.request) {
          setError("Error: No response received from server");
        } else {
          setError(`Error: ${error.message}`);
        }
      }
    };

    fetchMyData();
  }, [setMe]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <h1 className="text-blue-400 font-bold text-3xl flex w-full justify-center mt-10">
            HEY! @{me?.user.username}
          </h1>
          <span className="flex justify-center">
            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm m-10 w-[50vw]">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Name</dt>
                  <dd className="text-gray-700 sm:col-span-2">{me?.name}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Email</dt>
                  <dd className="text-gray-700 sm:col-span-2">{me?.email}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Resume Status</dt>
                  <dd className="text-gray-700 sm:col-span-2">Uploaded</dd>
                </div>
              </dl>
            </div>
          </span>
        </>
      )}
    </div>
  );
}

export default Home;
