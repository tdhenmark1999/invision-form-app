import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { FormControl, RadioGroup, FormControlLabel, Typography, Radio, TextField, Button, FormHelperText, Grid, Box, MenuItem, InputLabel, OutlinedInput } from '@mui/material';
import Select from '@mui/material/Select';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const industriesList = [
    'Accounting',
    'Advertising',
    'Aerospace',
    'Agriculture',
    'Automotive',
    'Banking',
    'Biotechnology',
    'Chemical',
    'Construction',
    'Consulting',
    'Consumer Goods',
    'Education',
    'Energy',
    'Entertainment',
    'Fashion',
    'Finance',
    'Food & Beverage',
    'Healthcare',
    'Hospitality',
    'Insurance',
    'Internet',
    'Legal',
    'Logistics',
    'Manufacturing',
    'Marketing',
    'Media',
    'Nonprofit',
    'Pharmaceutical',
    'Real Estate',
    'Retail',
    'Software',
    'Technology',
    'Telecommunications',
    'Transportation',
    'Travel',
];



const FormList = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const theme = useTheme();
    const [countries, setCountries] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailAddressError, setEmailAddressError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [otherValue, setOtherValue] = useState('');
    const [otherValueError, setOtherValueError] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedIndustryError, setSelectedIndustryError] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryError, setSelectedCountryError] = useState(false);
    const [selectedOptionError, setSelectedOptionError] = useState(false);

    const handleIndustryChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedIndustry(selectedValue);
    };

    const handleIndustryBlur = () => {
        setSelectedIndustryError(selectedIndustry === '');
    };

    const handleCountryChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCountry(selectedValue);
    };

    const handleCountryBlur = () => {
        setSelectedCountryError(selectedCountry === '');
    };

    const handleFirstNameChange = (event) => {
        const inputValue = event.target.value;
        const sanitizedValue = inputValue.replace(/[^A-Za-z]/g, ''); // Remove any non-letter characters
        setFirstName(sanitizedValue);
        setFirstNameError(false); // Reset the error state when the input changes
    };

    const handleRadioBlur = () => {
        setSelectedOptionError(selectedOption === '');
    };

    const handleOtherValueChange = (event) => {
        const inputValue = event.target.value;
        setOtherValue(inputValue);
        setOtherValueError(false);
    };

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);

        if (event.target.value === 'business-account') {
            setOtherValueError(false); // Reset the validation status
        } else {
            setOtherValue(''); // Clear the input value
        }
    };

    const handleLastNameChange = (event) => {
        const inputValue = event.target.value;
        const sanitizedValue = inputValue.replace(/[^A-Za-z]/g, ''); // Remove any non-letter characters
        setLastName(sanitizedValue);
        setLastNameError(false); // Reset the error state when the input changes
    };

    const handleEmailChange = (event) => {
        const inputValue = event.target.value;
        setEmailAddress(inputValue);
        setEmailAddressError(false); // Reset the error state when the input changes
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform form validation
        const formErrors = {};

        if (selectedCountry.trim() === '') {
            formErrors.selectedCountryError = true;
        }
        if (firstName.trim() === '') {
            formErrors.firstNameError = true;
        }
        if (lastName.trim() === '') {
            formErrors.lastNameError = true;
        }
        if (emailAddress.trim() === '') {
            formErrors.emailAddressError = true;
        }

        if (selectedIndustry.trim() === '') {
            formErrors.selectedIndustryError = true;
        }

        if (selectedOption === '') {
            formErrors.selectedOptionError = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
        if (!emailRegex.test(emailAddress)) {
            formErrors.emailAddressError = true;
        }

        if (selectedOption === 'business-account') {
            if (otherValue.trim() === '') {
                formErrors.otherValueError = true;
            }
        }

        // Check if there are any errors
        if (Object.keys(formErrors).length > 0) {
            setSubmitted(false); // Reset the submitted state if there are errors
            setFirstNameError(formErrors.firstNameError || false);
            setLastNameError(formErrors.lastNameError || false);
            setEmailAddressError(formErrors.emailAddressError || false);
            setSelectedIndustryError(formErrors.selectedIndustryError || false);
            setSelectedCountryError(formErrors.selectedCountryError || false);
            setSelectedOptionError(formErrors.selectedOptionError || false);
            setOtherValueError(formErrors.otherValueError || false);
        } else {
            setSubmitted(true); // Set the submitted state to true if there are no errors
        }
    };


    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const countryNames = data.map(country => country.name.common);
                const sortedCountries = countryNames.sort(); // Sort the country names alphabetically
                setCountries(sortedCountries);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    if (submitted) {
        return (
            <div className='wrapper-success'>
                <CheckCircleIcon />
                <h1>Success!</h1>
                <p>Your operation was successful.</p>

            </div>
        );
    }
    else {


        return (
            <Box>
                <h1 className='txt-header'>Welcome to PreviewMe!</h1>
                <p className='txt-desc'>To complete your account set up, please confirm some final details so we can tailor your experience to you.</p>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={{ md: 2 }} columns={{ md: 12 }}>
                        <Grid item xs={12} md={12}>
                            <InputLabel className='form-label--input'>Your Name *</InputLabel>
                        </Grid>
                        <Grid item xs={6} md={6} className='grid-container--fields'>
                            <FormControl variant="standard">
                                <TextField className='txt-fields--modify'
                                    sx={{ width: '100%', marginBottom: '10px' }}
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    placeholder='First name'
                                    error={firstNameError} // Set the error prop based on the error state
                                    helperText={firstNameError ? 'Please enter your first name' : ''}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={6} className='grid-container--fields'>
                            <FormControl variant="standard">
                                <TextField
                                    className='txt-fields--modify'
                                    sx={{ width: '100%', marginBottom: '10px' }}
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    placeholder='Last name'
                                    error={lastNameError} // Set the error prop based on the error state
                                    helperText={lastNameError ? 'Please enter your last name' : ''}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <InputLabel className='form-label--input'>Email address *</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={12} className='grid-container--fields'>
                            <FormControl variant="standard" sx={{ width: '100%' }}>
                                <TextField className='txt-fields--modify'
                                    sx={{ width: '100%', marginBottom: '10px' }}
                                    value={emailAddress}
                                    onChange={handleEmailChange}
                                    placeholder='Email address'
                                    error={emailAddressError} // Set the error prop based on the error state
                                    helperText={emailAddressError ? 'Please enter a valid email address' : ''}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <InputLabel className='form-label--input'>Which industries are you interested in?</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={12} className='grid-container--fields'>
                            <FormControl sx={{ width: '100%' }} error>

                                <Select
                                    className="custom-select"
                                    value={selectedIndustry}
                                    input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                    onChange={handleIndustryChange}
                                    error={selectedIndustryError}
                                    onBlur={handleIndustryBlur}
                                    helperText={selectedIndustryError ? 'Please select an industry' : ' '}
                                >
                                    <MenuItem disabled value="">
                                        Select industries
                                    </MenuItem>
                                    {industriesList.map((industry, index) => (

                                        <MenuItem
                                            key={index} value={industry}
                                        >
                                            {industry}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{selectedIndustryError ? 'Please select an industry' : ' '}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <InputLabel className='form-label--input'>Country*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={12} className='grid-container--fields'>
                            <FormControl sx={{ width: '100%' }} error>

                                <Select
                                    className="custom-select"
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    error={selectedCountryError}
                                    onBlur={handleCountryBlur}
                                    helperText={selectedCountryError ? 'Please select an country' : ' '}
                                    input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem disabled value="">
                                        Select country
                                    </MenuItem>
                                    {countries.map((country, index) => (
                                        <MenuItem
                                            key={index} value={country}
                                        >
                                            {country}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{selectedCountryError ? 'Please select an country' : ' '}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <InputLabel className='form-label--input'>Account type*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={12} className='grid-container--fields'>
                            <FormControl component="fieldset">
                                <RadioGroup name="option" value={selectedOption} onChange={handleRadioChange} onBlur={handleRadioBlur}>
                                    <Box className='radio-container'>
                                        <FormControlLabel className='radio-btn-title' value="personal-account" control={<Radio />} label="Personal account" />
                                        <Typography component="p" className='radio-btn-desc'>The best option if you’re an individual who’ll be showcasing themselves/making applications via PreviewMe</Typography>

                                    </Box>
                                    <Box className='radio-container'>
                                        <FormControlLabel className='radio-btn-title' value="business-account" control={<Radio />} label="Business account" />
                                        <Typography component="p" className='radio-btn-desc'>The best option if you’re an individual who’ll be showcasing themselves/making applications via PreviewMe</Typography>

                                    </Box>
                                </RadioGroup>
                                {/* Error message */}
                                {selectedOptionError && (
                                    <FormHelperText error>This field is required.</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        {selectedOption === 'business-account' && (
                            <Grid item xs={12} md={12} className='grid-container--fields'>
                                <TextField
                                    className="txt-fields--modify"
                                    fullWidth
                                    placeholder='Business Workspace Name'
                                    onChange={handleOtherValueChange}
                                    error={otherValueError}
                                    helperText={otherValueError ? 'Please enter a valid value' : ''}
                                />

                            </Grid>
                        )}

                        <Grid item xs={12} md={12} sx={{ textAlign: 'right', marginBottom: '30px' }}>
                            <Button variant="contained" type="submit" className='btn-finish'>Finish</Button>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography className='txt-required' component="p">* Required fields</Typography>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        );
    }
};

export default FormList;
