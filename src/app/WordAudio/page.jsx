"use client";
import { useEffect, useState } from "react";
import "./style.css";
import { useSpeechSynthesis } from "react-speech-kit";
import { MdAudiotrack } from "react-icons/md";
import { FaHeadset } from "react-icons/fa6";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

function Page() {

  /* ---------- Load All English Words ------------ */
  const [commonWords, setCommonWords] = useState("");
  useEffect( () => {

    fetch('words.json')
    .then( res => res.json())
    .then( data => setCommonWords(data))
  }, []);


  /* -------For Input Field Value------------- */
  const [inputValue, setInputValue] = useState("");
  const { speak } = useSpeechSynthesis();

  const handleInputFieldClick = () => {
    speak({ text: inputValue });
  };

  /* -------For English Words form Table Row ------------- */
  const handleWorldClick = (event) => {
    const word = event.target.textContent;
    speak({ text: word });
  };

  return (
    <div className="max-w-[1800px] mx-auto ">
      <div className=" w-full lg:w-10/12  mx-auto lg:mt-20 lg:py-20 text-center">
        <h1 className=" text-xl md:text-2xl lg:text-4xl font-bold flex justify-center items-center text-gray-700">
          <FaHeadset className="inline text-2xl md:text-3xl lg:text-6xl text-red-500 me-1 lg:me-2" />
          <span>RedRose Audio Book</span>{" "}
          <MdAudiotrack className="inline text-2xl md:text-4xl lg:text-6xl text-red-500" />
        </h1>

        <textarea
          placeholder="Write your text here."
          className=" w-11/12 md:w-8/12 lg:w-8/12 xl:w-6/12 mt-3 md:mt-8 border-2 lg:border-4 border-red-400 rounded-lg h-32 md:h-40  mx-auto p-2"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></textarea>
        <br />

        <div className="flex justify-center items-center mt-1 md:mt-3 lg:mt-5">
          <button
            onClick={() => {
              handleInputFieldClick();
            }}
            class="btn-live btn-glow rounded-xl md:rounded-3xl flex items-center justify-between gap-1 px-5 py-2 md:py-3 "
          >
            {" "}
            <HiOutlineSpeakerWave className="inline text-xl md:text-2xl font-bold" />{" "}
            Listen{" "}
          </button>
        </div>
      </div>

    {/* -------  Word Table -----------*/}

      <div className="my-10">
        <h1 className="text-center text-lg md:text-2xl lg:text-3xl font-semibold text-gray-700">
          10 Most Common English Words
        </h1>

        <div className="overflow-x-auto w-11/12  lg:w-9/12 xl:w-7/12 mx-auto mt-3 md:mt-5 lg:mt-10 mb-20 rounded-md shadow-lg">
          <table className="table text-[13px] md:text-[16px]">

           {/*---------- head ------------ */}
            <thead className="text-lg text-white font-semibold">
              <tr className="w-full text-[15px] md:text-[16px]">
                <th className="bg-blue-400 w-3/12">Rank</th>
                <th className="bg-purple-400 w-4/12" title="Word With Audio">
                  {" "}
                  <span>English</span>{" "}
                  <HiOutlineSpeakerWave className="inline text-xl md:text-2xl font-bold -mt-1" />
                </th>
                <th className="bg-orange-400 w-5/12">Bangla Meaning</th>
              </tr>
            </thead>

            <tbody>
                {  commonWords && commonWords.map((data) => {
                        return (
                            <tr key={data?.rank}>
                            <th className="bg-blue-100 ">{data?.rank}</th>
                            <td
                              title="Click to listen Pronunciation"
                              onClick={handleWorldClick}
                              className="bg-blue-100 hover:bg-blue-200 hover:cursor-pointer font-semibold text-gray-700"
                            >
                              {data?.word}
                            </td>
                            <td className="bg-blue-100 text-gray-700 font-semibold">{data?.bangla_meaning}</td>
                          </tr>
                        )
                    })
                }
             


            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
