const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-8 border-t border-border">
      <div className="container-drake">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center p-2">
              <img 
                src="/images/ALOGO.svg" 
                alt="Alfred Paul Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-lg font-bold">Alfred Paul</div>
          </div>
          
          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © 2025 Alfred Paul. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
