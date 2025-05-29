'use client';
import { useEffect, useState } from "react";
import RoutesHeader from "@/app/ui/components/RoutesHeader";
import { useParams } from "next/navigation";
import { fetchInstrument } from "@/lib/requests";
import Loading from "@/app/loading";
import Image from "next/image";
import ErrorHandling from "@/app/ui/components/ErrorHandling";

const Instrument = () => {
    const { id } = useParams();
    const [instrument, setInstrument] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstrumentData = async () => {
            if (!id) return;
            try {
                const data = await fetchInstrument(id);
                setInstrument(data);
            } catch (error) {
                console.error("Error fetching instrument:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInstrumentData();
    }, [id]);

    useEffect(() => {
        if (instrument) {
            document.title = `معرفی ساز ${instrument.instrument_name}`;
        }
    }, [instrument]);

    if (loading) {
        return <Loading />;
    }

    if (!instrument) {
        return <ErrorHandling />;
    }

    return (
        <div className="w-full bg-[#F6F4EE] dark:bg-gray-900">
            <RoutesHeader
                pageTitle="سازشناسی"
                boldText="آشنایی با ساز"
                Highlight={instrument.instrument_name}
            />
            <div className="container relative">
                <div className="content flex justify-center items-center flex-col p-5">
                    {/* Fixed-size image container */}
                    <div className="flex justify-center items-center absolute -top-[100px] md:-top-[200px] p-4 bg-white dark:bg-gray-700 rounded-3xl">
                        <Image
                            width={400} // Fixed width
                            height={400} // Fixed height
                            className="w-full max-h-[420px]  rounded-3xl"
                            src={instrument.instrument_img}
                            alt={instrument.instrument_name}
                            priority // Ensures the image loads quickly
                        />
                    </div>
                    {/* Description */}
                    <div className="w-[80%] mt-[240px] md:mt-[400px] text-base font-Dana leading-10 text-[#152420]/80 dark:text-gray-50">
                        {instrument.instrument_description}
                    </div>
                </div>
            </div>
            {/* Footer image */}
            <div>
                <Image
                    width={1920}
                    height={134}
                    src="/images/shapes/footer-1.png"
                    alt="footer"
                    priority
                />
            </div>
        </div>
    );
};

export default Instrument;