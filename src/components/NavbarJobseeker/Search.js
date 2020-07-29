import React, { Component } from "react";
class SearchJJJ extends Component {
  render() {
    return (
      <nav>
        <div>
          <form>
            <div class="input-field">
              <input type="search" required />
              <label class="label-icon" for="search">
                <i class="material-icons">search</i>
              </label>
              <i class="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

export default SearchJJJ;
