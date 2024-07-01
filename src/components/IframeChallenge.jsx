import React, { useEffect } from "react";
import PropTypes from "prop-types";

const StepUpIframe = ({ jwtChallenge }) => {
  useEffect(() => {
    const stepUpForm = document.querySelector("#step-up-form");
    if (stepUpForm) {
      stepUpForm.submit();
    }
  }, []);

  return (
    <div>
      <iframe
        name="step-up-iframe"
        height="600"
        width="400"
        title="Step-Up Iframe"
      ></iframe>
      <form
        id="step-up-form"
        target="step-up-iframe"
        method="post"
        action="https://centinelapistag.cardinalcommerce.com/V2/Cruise/StepUp"
      >
        <input type="hidden" name="JWT" value={jwtChallenge} />
        <input
          type="hidden"
          name="MD"
          value="optionally_include_custom_data_that_will_be_returned_as_is"
        />
      </form>
    </div>
  );
};

StepUpIframe.propTypes = {
  jwtChallenge: PropTypes.string.isRequired,
};

export default StepUpIframe;
