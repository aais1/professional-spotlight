import React, { useEffect, useState } from "react";
import getApi from "../../utils/sendrequest";
import { useLocation, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export default function BiographyPage() {
  const [biography, setBiography] = useState({});
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoadingBiography, setIsLoadingBiography] = useState(false);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

  const location = useLocation();
  const { biography: stateBiography } = location.state || {};
  const { slug } = useParams();

  const fetchBiography = async (slug) => {
    setIsLoadingBiography(true);
    try {
      const response = await getApi("GET", `/user/biography/${slug}`);
      if (response && response.biography) {
        setBiography(response.biography);
      } else {
        setBiography({});
      }
    } catch (error) {
      console.error("Error fetching biography:", error);
      setBiography({});
    } finally {
      setIsLoadingBiography(false);
    }
  };

  useEffect(() => {
    if (!stateBiography || !stateBiography.slug) {
      const slugFromUrl = location.pathname.split("/").pop();
      fetchBiography(slugFromUrl);
    } else {
      setBiography(stateBiography);
    }
  }, [stateBiography, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      toast.error("You must agree to the privacy policy and terms.");
      return;
    }

    setIsLoadingSubscription(true);
    try {
      const response = await getApi("POST", "/user/biography/subscribe", {
        email: email,
      });
      if (response.message === "Subscribed successfully") {
        toast.success("Subscribed successfully!");
        setEmail("");
        setIsChecked(false);
      } else {
        toast.info("You may have already subscribed with this email!");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoadingSubscription(false);
    }
  };

  if (!biography.title) {
    return <p>No biography data available</p>;
  }

  return (
    <>
      <ToastContainer />
      {isLoadingBiography && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#124e66]"></div>
        </div>
      )}

      <div>
        <div className="relative space-y-2 bg-center mt-5 sm:mt-10 px-4 sm:px-10 rounded-lg h-full w-full">
          <div className="relative mb-6 bg-center h-full bg-white">
            <div className="bg-cover bg-[#124e66] h-72 sm:h-96 w-full overflow-hidden">
              <img
                className="w-full h-full object-contain"
                src={biography?.banner}
                alt={biography?.title}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h1 className="text-xl sm:text-4xl sm:mb-12 font-semibold font-[Frutiger] text-white">
                  {biography?.title}
                </h1>
              </div>
            </div>
          </div>
          <div className="grid bg-white sm:flex">
            <div
              className="w-4/5 m-4 flex flex-wrap overflow-auto p-2 text-xs sm:text-base sm:p-12"
              style={{ lineHeight: "2", scrollbarColor: "transparent transparent" }}
            >
              <div className="text-[#124e66] overflow-y-auto ql-editor" style={{ height: "70rem" }}>
                {parse(biography?.description)}
              </div>
              <div className="flex flex-wrap w-full justify-around space-x-4 mt-4">
                {biography?.images?.slice(0, 2).map((image, index) => (
                  <img
                    key={index}
                    className="h-64 w-72 object-cover rounded-lg"
                    src={image}
                    alt={`Image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ql-editor {
          padding: 0;
        }
        .ql-editor h1 { font-size: 2em; }
        .ql-editor h2 { font-size: 1.5em; }
        .ql-editor h3 { font-size: 1.17em; }
        .ql-editor h4 { font-size: 1em; }
        .ql-editor h5 { font-size: 0.83em; }
        .ql-editor h6 { font-size: 0.67em; }
        .ql-editor .ql-size-small { font-size: 0.75em; }
        .ql-editor .ql-size-large { font-size: 1.5em; }
        .ql-editor .ql-size-huge { font-size: 2.5em; }
        .ql-editor p { margin-bottom: 1em; }
        .ql-editor ul, .ql-editor ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        .ql-editor li {
          margin-bottom: 0.5em;
        }
        .ql-editor a {
          color: #0000FF;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}