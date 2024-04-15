const ParentCompanyDetails = (props) => {
    const { isParentHave, title, control, errors } = props;
    const [isAccepted, setIsAccepted] = useState(false);
    return (
      <Card>
        <CardHeader>
          <CardText>
            <Alert color="warning">{isParentHave && title}</Alert>
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="12"></Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="company_registration_no">
                Company registration number?
              </Label>
              <Controller
                name="parent_company_detail.company_registration_no"
                control={control}
                rules={{
                  // required: true,
                  maxLength: {
                    value: 20,
                    message: "value must be lesser than 20",
                  },
                }}
                render={({ field }) => {
                  return (
                    <Input
                      type="number"
                      readOnly={isAccepted}
                      invalid={errors.company_registration_no && true}
                      {...field}
                    />
                  );
                }}
              />
              {errors?.parent_company_detail?.parent_company_detail?.company_registration_no ? (
                <FormFeedback>
                  {errors?.parent_company_detail?.parent_company_detail?.company_registration_no.message}
                </FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="legal_company_name">Legal name of company</Label>
              <Controller
                name="parent_company_detail.legal_company_name"
                control={control}
                rules={{
                  maxLength: {
                    value: 32,
                    message: "value must be lesser than 32",
                  },
                }}
                render={({ field }) => (
                  <Input
                    control={control}
                    type="text"
                    {...field}
                    invalid={errors.legal_company_name && true}
                    readOnly={isAccepted}
                  />
                )}
              />
              {errors?.parent_company_detail?.parent_company_detail?.legal_company_name ? (
                <FormFeedback>{errors?.parent_company_detail?.parent_company_detail?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="legal_company_name">
                Registered DBA/trade name
              </Label>
              <Controller
                id="trade_name"
                name="parent_company_detail.trade_name"
                control={control}
                rules={{
                  maxLength: {
                    value: 32,
                    message: "value must be lesser than 32",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    name="parent_company_detail.trade_name"
                    type="text"
                    invalid={errors.trade_name && true}
                    readOnly={isAccepted}
                  />
                )}
              />
              {errors?.parent_company_detail?.trade_name ? (
                <FormFeedback>{errors?.parent_company_detail?.trade_name?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col sm="12" md="6" lg="6" className="msb-1">
              <Label htmlFor="">Type of business</Label>
              <Controller
                id="business_type"
                name="parent_company_detail.business_type"
                control={control}
                rules={{
                  maxLength: {
                    value: 32,
                    message: "value must be lesser than 32",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    name="parent_company_detail.business_type"
                    type="text"
                    invalid={errors.business_type && true}
                    readOnly={isAccepted}
                  />
                )}
              />
              {errors?.parent_company_detail?.business_type ? (
                <FormFeedback>{errors?.parent_company_detail?.business_type?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="registered_street_address">Street address</Label>
              <Controller
                id="registered_street_address"
                name="parent_company_detail.registered_street_address"
                control={control}
                rules={{
                  maxLength: {
                    value: 50,
                    message: "value must be lesser than 50",
                  },
                }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="text"
                      invalid={errors.registered_street_address && true}
                      readOnly={isAccepted}
                    />
                  );
                }}
              />
              {errors?.parent_company_detail?.registered_street_address ? (
                <FormFeedback>
                  {errors?.parent_company_detail?.registered_street_address?.message}
                </FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="">Office / House number</Label>
              <Controller
                id="house_number"
                name="parent_company_detail.house_number"
                control={control}
                rules={{
                  maxLength: {
                    value: 5,
                    message: "value must be lesser than 5",
                  },
                }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name="parent_company_detail.house_number"
                      type="text"
                      invalid={errors.house_number && true}
                      readOnly={isAccepted}
                    />
                  );
                }}
              />
              {errors?.parent_company_detail?.house_number ? (
                <FormFeedback>{errors?.parent_company_detail?.house_number?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="">Postcode / zip code</Label>
              <Controller
                id="zip_code"
                name="parent_company_detail.zip_code"
                control={control}
                rules={{
                  maxLength: {
                    value: 10,
                    message: "value must be lesser than 10",
                  },
                }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="text"
                      invalid={errors.zip_code && true}
                      readOnly={isAccepted}
                    />
                  );
                }}
              />
              {errors?.parent_company_detail?.zip_code ? (
                <FormFeedback>{errors?.parent_company_detail?.zip_code?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="">City</Label>
              <Controller
                id="city"
                name="parent_company_detail.city"
                control={control}
                rules={{
                  maxLength: {
                    value: 15,
                    message: "value must be lesser than 15",
                  },
                }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="text"
                      invalid={errors.city && true}
                      readOnly={isAccepted}
                    />
                  );
                }}
              />
              {errors?.parent_company_detail?.city ? (
                <FormFeedback>{errors?.parent_company_detail?.city?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="">State</Label>
              <Controller
                id="state"
                name="parent_company_detail.state"
                control={control}
                rules={{
                  maxLength: {
                    value: 15,
                    message: "value must be lesser than 15",
                  },
                }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="text"
                      invalid={errors.state && true}
                      readOnly={isAccepted}
                    />
                  );
                }}
              />
              {errors?.parent_company_detail?.state ? (
                <FormFeedback>{errors?.parent_company_detail?.state?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="">Country</Label>
              <Controller
                id="country"
                name="parent_company_detail.country"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="select"
                      invalid={errors.country && true}
                      disabled={isAccepted}
                    >
                      <option value="none" selected disabled hidden>
                        Select Country
                      </option>
                      {countryList}
                    </Input>
                  );
                }}
              />
              {errors?.parent_company_detail?.country ? (
                <FormFeedback>{errors?.parent_company_detail?.country?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="telephone_number">Telephone number</Label>
              <Controller
                id="telephone_number"
                name="parent_company_detail.telephone_number"
                control={control}
                rules={{
                  maxLength: {
                    value: 15,
                    message: "value must be lesser than 15",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.telephone_number && true}
                    readOnly={isAccepted}
                  />
                )}
              />
              {errors?.parent_company_detail?.telephone_number ? (
                <FormFeedback>{errors?.parent_company_detail?.telephone_number?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="fax_number">Fax number</Label>
              <Controller
                id="fax_number"
                name="parent_company_detail.fax_number"
                control={control}
                rules={{
                  maxLength: {
                    value: 10,
                    message: "value must be lesser than 10",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors?.parent_company_detail?.fax_number && true}
                    readOnly={isAccepted}
                  />
                )}
              />
              {errors?.parent_company_detail?.fax_number ? (
                <FormFeedback>{errors?.parent_company_detail?.fax_number?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="turnover_last_year">Turnover last year</Label>
              <Controller
                id="turnover_last_year"
                name="parent_company_detail.turnover_last_year"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.turnover_last_year && true}
                    readOnly={isAccepted}
                  />
                )}
              />
              {errors?.parent_company_detail?.turnover_last_year ? (
                <FormFeedback>{errors?.parent_company_detail?.turnover_last_year?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="currency">Currency</Label>
              <Controller
                id="currency"
                name="parent_company_detail.currency"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="parent_company_detail.currency"
                    type="select"
                    invalid={errors.currency && true}
                    disabled={isAccepted}
                  >
                    <option>---currency---</option>
                    {currencyList}
                  </Input>
                )}
              />
              {errors?.parent_company_detail?.currency ? (
                <FormFeedback>{errors?.parent_company_detail?.currency?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="incorporation_date">Incorporation Date</Label>
              <Controller
                id="incorporation_date"
                name="parent_company_detail.incorporation_date"
                control={control}
                requird
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    invalid={errors.incorporation_date && true}
                    readOnly={isAccepted}
                  />
                )}
              />
              {errors?.parent_company_detail?.incorporation_date ? (
                <FormFeedback>{errors?.parent_company_detail?.incorporation_date?.message}</FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="tax_identification_number">
                VAT / Tax Identification number³
              </Label>
              <Controller
                id="tax_identification_number"
                name="parent_company_detail.tax_identification_number"
                control={control}
                rules={{
                  maxLength: {
                    value: 15,
                    message: "value must be lesser than 15",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.tax_identification_number && true}
                    readOnly={isAccepted}
                  />
                )}
              />
              {errors?.parent_company_detail?.tax_identification_number ? (
                <FormFeedback>
                  {errors?.parent_company_detail?.tax_identification_number?.message}
                </FormFeedback>
              ) : null}
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="stock_exchange">
                Is company publicly listed on a stock exchange?
              </Label>
              <Controller
                id="stock_exchange"
                name="parent_company_detail.stock_exchange"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <div className="form-switch form-check-primary">
                      <Input
                        type="switch"
                        name="parent_company_detail.icon-primary"
                        onChange={onChange}
                        checked={value}
                      />
                    </div>
                  );
                }}
              />
            </Col>
            <Col
              sm="12"
              md={isParentHave ? 12 : 6}
              lg={isParentHave ? 12 : 6}
              className="mb-1"
            >
              <Label htmlFor="">
                Is company a registered ‘not-for-profit’ organization?
              </Label>
              <Controller
                id="not_for_profit"
                name="parent_company_detail.not_for_profit"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      name="parent_company_detail.icon-primary"
                      onChange={onChange}
                      checked={value}
                    />
                  </div>
                )}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };