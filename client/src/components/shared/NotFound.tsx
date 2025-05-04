const NotFound = ({ text }: { text: string }) => {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
};

export default NotFound;
