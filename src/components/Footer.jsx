const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-200 mt-15">
      
      {/* Back to top */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-slate-700 text-center py-3 cursor-pointer hover:bg-slate-600 transition"
      >
        Back to top
      </div>

      {/* Links */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">
        
        <div>
          <h3 className="font-semibold text-white mb-3">Get to Know Us</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Press Releases</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Connect with Us</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Facebook</li>
            <li className="hover:underline cursor-pointer">Twitter</li>
            <li className="hover:underline cursor-pointer">Instagram</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Make Money with Us</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Sell on ShopKart</li>
            <li className="hover:underline cursor-pointer">Affiliate Program</li>
            <li className="hover:underline cursor-pointer">Advertise Products</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Let Us Help You</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Your Account</li>
            <li className="hover:underline cursor-pointer">Returns</li>
            <li className="hover:underline cursor-pointer">Help</li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700 py-4 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} ShopKart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
