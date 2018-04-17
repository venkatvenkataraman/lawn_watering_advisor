// dependencies
import React, { Component } from "react";

import "./About.css";

class About extends Component {
	render() {
		return (
			<section className="section-about">
				<div className="u-center-text u-margin-bottom-big">
						<h2 className="heading-secondary">
								An innovative solution for an innovative age
						</h2>
				</div>

				<div className="row">
					<div className="col-1-of-2">
						<h3 className="heading-tertiary u-margin-bottom-small">
							The power of science in the palm of your hand
						</h3>
						<p className="paragraph">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus error dicta perferendis obcaecati labore unde soluta voluptate hic id nobis dolorum ullam vero temporibus placeat saepe quaerat, at rem tempora!
						</p>
					</div>
					<div className="col-1-of-2">
						<h3 className="heading-tertiary u-margin-bottom-small">
							No landscape is too big or too small
						</h3>
						<p className="paragraph">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus error dicta perferendis obcaecati labore unde soluta voluptate hic id nobis dolorum ullam vero temporibus placeat saepe quaerat, at rem tempora!
						</p>
					</div>
				</div>

				<div className="u-center-text u-margin-bottom-big">
					<a href="#" className="btn-text">Learn More &rarr;</a>
				</div>

			</section>
		)
	}
}

export default About;