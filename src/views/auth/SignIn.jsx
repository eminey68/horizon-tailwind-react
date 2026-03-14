import React, { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); 
    setError(""); 

    let role = "";
    
    if (email === "admin@kiu.edu.tr" && password === "123456") {
      role = "admin";
    } else if (email === "akademisyen@istiklal.edu.tr" && password === "123456") {
      role = "academic";
    } else if (email === "ogrenci@istiklal.edu.tr" && password === "123456") {
      role = "student";
    } else {
      setError("❌ E-posta veya şifre hatalı!");
      return; 
    }

    localStorage.setItem("userRole", role);
    window.location.href = "/admin/default";
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/kampus.png')" }}
    >
      
      {/* --- KARARTMA KATMANI --- */}
      <div className="absolute inset-0 z-0 bg-black/50"></div>

      {/* --- TAM ŞEFFAF CAM KUTU (Glassmorphism) --- */}
      {/* bg-white/10: Sadece %10 beyaz, backdrop-blur-xl: Yüksek bulanıklık, border-white/30: Şeffaf beyaz kenarlık */}
      <div className="relative z-10 mx-4 w-full max-w-[420px] flex-col items-center rounded-3xl border border-white/30 bg-white/10 px-8 py-10 shadow-2xl backdrop-blur-xl">
        
        <h4 className="mb-2.5 text-center text-3xl font-bold text-white">
          Kaynak Yönetim Platformu
        </h4>
        <p className="mb-8 text-center text-sm text-gray-200">
          Lütfen kurumsal e-posta ve şifrenizle giriş yapın.
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          <div>
            <label className="text-sm font-bold text-white">Kurumsal E-Posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@istiklal.edu.tr"
              /* İnputlar da şeffaf cam gibi yapıldı ve yazılar beyaza çevrildi */
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-white placeholder:text-gray-300 outline-none transition-colors focus:border-white focus:bg-white/20"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-white">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 karakter"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-white placeholder:text-gray-300 outline-none transition-colors focus:border-white focus:bg-white/20"
              required
            />
          </div>

          {error && <p className="text-center text-sm font-bold text-red-400">{error}</p>}

          <button
            type="submit"
            className="linear mt-4 w-full rounded-xl bg-[#e6b13e] py-[12px] text-base font-bold text-white shadow-md transition duration-200 hover:bg-[#d6a12e] hover:shadow-lg active:bg-[#c29022]"
          >
            Sisteme Giriş Yap
          </button>
        </form>
        
        <div className="mt-6 flex justify-center">
           <button 
             onClick={() => alert("Şifre sıfırlama linki e-postanıza gönderildi.")} 
             className="text-sm font-bold text-gray-300 transition-colors hover:text-white"
           >
             Şifrenizi mi unuttunuz?
           </button>
        </div>

      </div>
    </div>
  );
}