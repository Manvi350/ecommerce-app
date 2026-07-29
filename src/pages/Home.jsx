import ProductCard from "../components/ProductCard";
import { useCart } from '../context/CartContext';
import { useCategory } from "../context/CategoryContext";
import { useState, useEffect, useRef } from "react";
import { useSearch } from "../context/SearchContext";
import axios from "axios";

const useInView = (threshold = 0.1) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);
    return [ref, inView];
};

const AnimatedCard = ({ children, index }) => {
    const [ref, inView] = useInView(0.08);
    return (
        <div ref={ref} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0px)' : 'translateY(36px)',
            transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
        }}>
            {children}
        </div>
    );
};

const Home = () => {
    const { category } = useCategory();
    const { addToCart } = useCart();
    const [searchTerm] = useSearch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/products")
            .then(res => { setProducts(res.data); setLoading(false); })
            .catch(err => { console.error("Error fetching products:", err); setLoading(false); });
    }, []);

    let filteredproducts = category === "All"
        ? products
        : products.filter((p) => p.category === category);

    if (searchTerm.trim() !== "") {
        filteredproducts = filteredproducts.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return (
        <div className="min-h-screen bg-[#EAEDED]">
            <style>{`
                @keyframes shimmer {
                    0%   { background-position: -800px 0; }
                    100% { background-position:  800px 0; }
                }
                .skeleton {
                    background: linear-gradient(90deg, #d4d4d4 25%, #e8e8e8 50%, #d4d4d4 75%);
                    background-size: 800px 100%;
                    animation: shimmer 1.5s infinite linear;
                    border-radius: 4px;
                }
                .section-title::after {
                    content: '';
                    display: block;
                    width: 60px;
                    height: 3px;
                    background: #f0c14b;
                    margin-top: 6px;
                    border-radius: 2px;
                }
            `}</style>

            <div className="max-w-[1500px] mx-auto px-4 py-4">

                {/* Banner strip */}
                <div className="bg-gradient-to-r from-[#232f3e] to-[#37475A] text-white rounded-sm px-6 py-3 mb-4 flex items-center justify-between">
                    <p className="text-sm">
                        🎉 <span className="font-semibold">Great Indian Sale</span> — Up to 70% off on top products!
                    </p>
                    <span className="text-amber-400 text-sm font-semibold cursor-pointer hover:underline">Shop now →</span>
                </div>

                {/* Section header */}
                <div className="bg-white rounded-sm p-4 mb-4 shadow-sm">
                    <h2 className="section-title text-xl font-semibold text-[#0F1111]">
                        {category === "All" ? "Best Sellers" : category}
                        {searchTerm.trim() !== "" && (
                            <span className="text-base font-normal text-gray-500 ml-2">
                                — results for "<span className="text-[#c7511f]">{searchTerm}</span>"
                            </span>
                        )}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {loading ? "Loading..." : `${filteredproducts.length} results`}
                    </p>
                </div>

                {/* Products grid */}
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-sm p-4 flex flex-col gap-3">
                                <div className="skeleton h-44 w-full" />
                                <div className="skeleton h-4 w-full" />
                                <div className="skeleton h-4 w-3/4" />
                                <div className="skeleton h-6 w-1/2" />
                                <div className="skeleton h-9 w-full mt-auto" />
                            </div>
                        ))}
                    </div>
                ) : filteredproducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                        {filteredproducts.map((p, index) => (
                            <AnimatedCard key={p._id || p.id} index={index}>
                                <ProductCard product={p} addToCart={addToCart} />
                            </AnimatedCard>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-sm p-12 text-center shadow-sm">
                        <p className="text-2xl mb-2">🔍</p>
                        <p className="text-lg font-medium text-gray-700">No results found</p>
                        <p className="text-sm text-gray-500 mt-1">Try different keywords or browse categories above</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;