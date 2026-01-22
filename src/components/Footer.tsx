const Footer = () => {
  const socialLinks = [
    { href: "https://github.com/kudodzzz", icon: "fa-brands fa-github", label: "GitHub" },
    { href: "https://discord.com/users/810874313372467210", icon: "fa-brands fa-discord", label: "Discord" },
    { href: "https://discord.com/invite/WYMXvrnpz2", icon: "fa-brands fa-discord", label: "Server" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-background via-card to-background border-t border-primary/20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
        <img
          src="https://i.postimg.cc/8PxTnNp6/k2kwatch.png"
          alt="K2KWatch"
          className="h-16 mx-auto mb-4 animate-glow"
        />
        
        <p className="text-muted-foreground text-lg mt-4 font-medium">
          Xịn xò • Mượt mà • Đẳng cấp :3
        </p>

        <p className="text-muted-foreground/60 text-xs max-w-2xl mx-auto mt-6 leading-relaxed">
          Chúng tôi từ chối mọi trách nhiệm liên quan đến nội dung hiển thị hoặc tồn tại trên trang. 
          Tất cả video và dữ liệu tại đây đều được tổng hợp từ các nguồn phổ biến trên Internet.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
            >
              <i className={link.icon} />
              <span>{link.label}</span>
            </a>
          ))}
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl text-sm font-bold hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            <i className="fa-solid fa-house" />
            <span>Trang chủ</span>
          </a>
        </div>


        <div className="flex items-center justify-center gap-3 mt-10 py-3 px-6 bg-red-600/20 border border-red-500/50 rounded-full w-fit mx-auto">
          <img
            src="//cdn.kdz.ct.ws/k2kwatch/assets/vn_flag.svg"
            alt="Vietnam"
            className="w-6 h-auto rounded"
          />
          <span className="text-sm">
            <span>Hoàng Sa & Trường Sa là của Việt Nam!</span>
          </span>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50">
          <p className="text-muted-foreground/50 text-xs">
            © 2025 K2KWatch
          </p>
          <p className="text-muted-foreground/40 text-xs mt-2">
            made by k2kteam with love ❤️
          </p>
  
          <a href="/hidden/210">
          <p className="text-muted-foreground/40 text-xs mt-2">
          210 (Tính năng bí mật, phát triển bởi <a href="//github.com/skeletonzz" className="underline hover:text-primary-foreground">skelentzt</a>)
          </p>
          </a>

          <p className="text-muted-foreground/40 text-xs mt-2">
            member: <a href="//github.com/kudodzzz" className="underline hover:text-primary-foreground">kudodzzz</a> • <a href="//github.com/skeletonzz" className="underline hover:text-primary-foreground">skelentzt</a>
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
