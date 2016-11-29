class PlayerBatchSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocale: this.props.selectedLocale,
      selectedBatch: this.props.selectedBatch
    }
  }

  render() {
    var otherLocales = this.props.locales.filter((locale) => { return locale.code !== this.state.selectedLocale.code });
    var otherBatches = this.props.batches.filter((batch) => { return batch.city.course_locale === this.state.selectedLocale.code && (!this.state.selectedBatch || batch.slug !== this.state.selectedBatch.slug) });

    var languageSelector =
      <ReactBootstrap.Dropdown id="languageSelector" ref="languageSelector">
        <ReactBootstrap.Dropdown.Toggle>
          {this.state.selectedLocale.name}
          <span dangerouslySetInnerHTML={{__html: this.state.selectedLocale.icon}}></span>
        </ReactBootstrap.Dropdown.Toggle>
        <ReactBootstrap.Dropdown.Menu>
          {otherLocales.map((locale, index) => {
            return <li key={index} onClick={() => this.changeLanguage(locale)}>
              {locale.name}
              <span dangerouslySetInnerHTML={{__html: locale.icon}}></span>
            </li>
          })}
        </ReactBootstrap.Dropdown.Menu>
      </ReactBootstrap.Dropdown>;

    var batchSelectorToggle = <ReactBootstrap.Dropdown.Toggle>
        <span>Choose Batch (TODO i18n)</span>
      </ReactBootstrap.Dropdown.Toggle>;

    if (this.state.selectedBatch) {
        var batchSelectorToggle = <ReactBootstrap.Dropdown.Toggle>
            {this.state.selectedBatch.city.name} {this.state.selectedBatch.slug}
            <small>TODO DATE</small>
          </ReactBootstrap.Dropdown.Toggle>;
    }

    var batchSelector =
      <ReactBootstrap.Dropdown id="batchSelector" ref="batchSelector">
        {batchSelectorToggle}
        <ReactBootstrap.Dropdown.Menu>
          {otherBatches.map((batch, index) => {
            return <li key={index} onClick={() => this.changeBatch(batch)}>
              {batch.city.name} {batch.slug}
              <small>TODO DATE</small>
            </li>
          })}
        </ReactBootstrap.Dropdown.Menu>
      </ReactBootstrap.Dropdown>;

    return <div className="dropdown-section">
      <div className="dropdown-container">
        {languageSelector}
      </div>
      <div className="dropdown-container">
        {batchSelector}
      </div>
    </div>;
  }

  changeLanguage(locale) {
    this.setState({ selectedLocale: locale, selectedBatch: null });
    this.refs.languageSelector._values.open = false; // toggle dropdown
  }

  changeBatch(batch) {
    this.setState({ selectedBatch: batch });
    this.refs.batchSelector._values.open = false; // toggle dropdown
  }
}
