import img1 from "../images/A.jpg";

const AboutUs = () => {
  return (
    // <div className="text-color ms-5 me-5 mr-5 mt-3">
    <div>


      <section className="pt-4">
        <div className="container px-lg-5">
          <div className="row gx-lg-5">
            {[
              { icon: 'bi-journal-check', title: 'Advance reservation and online booking', text: 'Book your turfs in advance by using our website' },
              { icon: 'bi-bell', title: 'Real time alerts and notification', text: 'You will get your booking and cancellation status via SMS and email' },
              { icon: 'bi-hand-thumbs-up', title: 'Rate and review', text: 'You can rate the turfs/playground you are playing at' },
              { icon: 'bi-credit-card-2-back', title: 'Online and offline payment mode available', text: 'You can do your payment via online and offline mode' },
              { icon: 'bi-card-text', title: 'Discount vouchers', text: 'Generate discount vouchers for special customers' },
              { icon: 'bi-pin-map', title: 'Location search', text: 'Search and find turfs around you' },
            ].map((feature, index) => (
              <div className="col-lg-6 col-xxl-4 mb-5" key={index}>
                <div className="card bg-light border-0 h-100">
                  <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                    <div className={`feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4`}>
                      <i className={`bi ${feature.icon}`}></i>
                    </div>
                    <h2 className="fs-4 fw-bold">{feature.title}</h2>
                    <p className="mb-0">{feature.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr style={{ borderTop: '1px solid black' }} />
          <h2 style={{ textAlign: 'center' }}>Meet Our Team</h2>
          <div className="row text-center my-5">
            {[
              { name: 'AAA', role: 'Front-End Developer', img: `${img1}` },
              { name: 'BBB', role: 'Full-Stack Developer', img: `${img1}` },
              { name: 'CCC', role: 'Full-Stack Developer', img: `${img1}` },
            ].map((member, index) => (
              <div className="col" key={index}>
                <img src={member.img} alt={member.name} className="round my-3" style={{ height: '175px', width: '200px' }} />
                <h5>{member.name}</h5>
                <strong>{member.role}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">Copyright &copy; TurfEase 2024</p>
        </div>
      </footer>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      <script src="../static/js/aboutusscript.js"></script>
    </div>
    //   </div>
  );
};

export default AboutUs;
