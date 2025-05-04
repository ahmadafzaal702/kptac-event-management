// Footer FC Component
const Footer = () => {

  // Footer FC return
  return (
    <>
      <footer className="border-t bg-secondary/50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-muted-foreground">
          <p>© Event Management. All rights reserved.</p>
          <p className="mt-2">
            Built with <span className="text-primary">Next.js</span> and
            <span className="text-primary">Shadcn/ui</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
