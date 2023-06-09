block content
    .car-title
        .car-title-info
            h1 #{car.model.year} #{car.make.name}  #{car.model.name}
            h2 #[em #{car.version.name}]
        .car-title-controls
            p 
                a(href=`/inventory/car/${car._id}/update`) Update
            p2
                a(href=`/inventory/car/${car._id}/delete`) Delete
    .car-info-container
        .car-media
            if pics.length > 0
                .main-img
                    .previous-control
                        img(src='/images/icons/previousIcons/previous1.svg' alt='Previous icon' class='main-img-control')
                    .main-img-container
                        img(src=`data:${pics[0].image.contentType};base64,${pics[0].image.toString('base64')}` alt='Car image' id='main-img')
                    .next-control
                        img(src='/images/icons/nextIcons/next1.svg' alt='Next icon' class='main-img-control')
                .side-imgs
                    for pic in pics 
                        img(src=`data:${pic.image.contentType};base64,${pic.image.toString('base64')}` alt='Car image')
            if pics.length < 1
                .main-img 
                    .previous-control 
                    .main-img-container 
                        img(src='/images/dummyImages/dummy4.avif' alt='Unavailable vehicle picture placeholder image')
                    .next-control 
        .car-technical
            .card-technical
                .card-technical-title(id='measurementSwitch')
                    .card-technical-title-group
                        img(src='/images/icons/carIcons/car3.svg' alt='Car Icon')
                        h4 Basics
                    .measurementSystem(id='measurementBasics')
                        p(class='selectedText') Imperial
                        p |
                        p Metric
                .card-technical-rows
                    if car.version.fuelSpecifics 
                        .card-technical-row 
                            img(src='/images/icons/energyIcons/energy1.svg' alt='Energy Icon' id='energyIcon')
                            h5 #{car.version.fuelSpecifics}
                    else 
                        .card-technical-row 
                            img(src='/images/icons/energyIcons/energy1.svg' alt='Energy Icon' id='energyIcon')
                            h5 N/A
                    if car.version.transmission
                        .card-technical-row
                            img(src='/images/icons/transmissionIcons/transmission2.svg' alt='Transmission Icon')
                            if /transmission/i.test(car.version.transmission) == false
                                h5 #{car.version.transmission} Transmission
                            else
                                h5 #{car.version.transmission}
                    if car.version.drive
                        .card-technical-row(id='technicalRowDrive')
                            if /^r/i.test(car.version.drive)
                                img(src='/images/icons/RWDIcons/rear1.svg' alt='Rear-wheel-drive Icon')
                                h5 RWD
                            if /^f/i.test(car.version.drive)
                                img(src='/images/icons/FWDIcons/front1.svg' alt='Front-wheel-drive Icon')
                                h5 FWD
                            if /^all/i.test(car.version.drive)
                                img(src='/images/icons/AWDIcons/all1.svg' alt='All-wheel-drive Icon')
                                h5 AWD
                            if /4/.test(car.version.drive)
                                img(src='/images/icons/AWDIcons/all1.svg' alt='All-wheel-drive Icon')
                                h5 4WD
                    if car.version.weight
                        - weight = car.version.weight
                        .card-technical-row(id='imperialWeight')                             
                            img(src='/images/icons/weightIcons/weight3.svg' alt='Weight Icon' id='weightIcon')
                            h5 #{Math.round(weight*2.20462).toLocaleString()} lbs
                        .card-technical-row(id='metricWeight' class='invisible')
                            img(src='/images/icons/weightIcons/weight3.svg' alt='Weight Icon' id='weightIcon')
                            h5 #{car.version.weight.toLocaleString()} kg
                    if !car.version.length && !car.version.width && !car.version.height
                        .card-technical-row(id='imperialDimensions')
                            img(src='/images/icons/dimensionsIcons/dimensions1.svg' alt='Dimensions Icon' id='dimensionsIcon')
                            h5 Dimensions: N/A
                    if car.version.length && car.version.width && car.version.height
                        .card-technical-row(id='imperialDimensions')
                            img(src='/images/icons/dimensionsIcons/dimensions1.svg' alt='Dimensions Icon')
                            h5 Dimensions (LxWxH): #{(Math.round(car.version.length*0.3937*10)/10).toLocaleString()} in x #{(Math.round(car.version.width*0.3937*10)/10).toLocaleString()} in x #{(Math.round(car.version.height*0.3937*10)/10).toLocaleString()} in
                        .card-technical-row(id='metricDimensions' class='invisible')
                            img(src='/images/icons/dimensionsIcons/dimensions1.svg' alt='Dimensions Icon')
                            h5 Dimensions (LxWxH): #{Math.round(car.version.length/10)/100} m x #{Math.round(car.version.width/10)/100} m x #{Math.round(car.version.height/10)/100} m
            if car.version.enginePower || car.version.engineTorqueNm || car.version.enginePosition || car.version.engineCC || car.version.engineCyl || !car.version.engineCompression || /Not/.test(car.version.engineCompression) == false            
                .card-technical
                    .card-technical-title
                        img(src='/images/icons/engineIcons/engine2.svg' alt='Engine Icon' id='engineIcon')
                        h4 Engine 
                    .card-technical-rows(id='cardTechnicalRowsEngine')
                        if car.version.enginePosition
                            .card-technical-row
                                if /front/i.test(car.version.enginePosition)
                                    img(src='/images/icons/engineFrontIcons/front1.svg' alt='Front Engine Icon')
                                if /middle/i.test(car.version.enginePosition)
                                    img(src='/images/icons/engineCenterIcons/center1.svg' alt='Middle Engine Icon')
                                if /back/i.test(car.version.enginePosition)
                                    img(src='/images/icons/engineBackIcons/back1.svg' alt='Back Engine Icon')
                                if /rear/i.test(car.version.enginePosition)
                                    img(src='/images/icons/engineBackIcons/back1.svg' alt='Back Engine Icon')
                                h5 Position: #{car.version.enginePosition}
                        if car.version.engineType
                            .card-technical-row
                                img(src='/images/icons/engineIcons/engine1.svg' alt='Engine Type Icon')
                                h5 Type: #{car.version.engineType}
                        if car.version.engineCC
                            .card-technical-row
                                img(src='/images/icons/displacementIcons/displacement1.svg' alt='Displacement Icon')
                                h5 Displacement: #{car.version.engineCC.toLocaleString()} cc
                        if car.version.engineCyl
                            .card-technical-row
                                img(src='/images/icons/cylinderIcons/cylinders2.svg' alt='Cylinders Icon')
                                h5 Cylinders: #{car.version.engineCyl}
                        if /\d/.test(car.version.engineCompression)
                            .card-technical-row
                                img(src='/images/icons/compressionIcons/compression3.svg' alt='Compression Icon')
                                h5 Compression: #{car.version.engineCompression}
                        if car.version.engineTorqueNm
                            .card-technical-row
                                img(src='/images/icons/torqueIcons/torque3.svg' alt='Torque Icon')
                                h5 Torque: #{car.version.engineTorqueNm} Nm
                        if car.version.enginePower
                            .card-technical-row
                                img(src='/images/icons/powerIcons/power3.svg' alt='Power Icon' id='powerIcon')
                                h5 Power: #{car.version.enginePower} hp
            .card-technical
                .card-technical-title(id='measurementSwitch')
                    .card-technical-title-group
                        img(src='/images/icons/efficiencyIcons/efficiency2.svg' alt='Efficiency Icon')
                        h4 Efficiency   
                    .measurementSystem(id='measurementEfficiency')
                        p(class='selectedText') Imperial
                        p |
                        p Metric
                .card-technical-rows
                    .card-technical-row(id='imperialHwy')
                        img(src='/images/icons/highwayIcons/highway2.svg' alt='Highway Icon')
                        if !car.version.fuelEfficiencyHgw 
                            h5 Highway: N/A
                        if car.version.fuelEfficiencyHgw && typeof car.version.fuelEfficiencyHgw !== 'string'
                            h5 Highway: #{car.version.fuelEfficiencyHgw} mpg
                    .card-technical-row(id='metricHwy' class='invisible')
                        img(src='/images/icons/highwayIcons/highway2.svg' alt='Highway Icon')
                        if !car.version.fuelEfficiencyHgw
                            h5 Highway: N/A 
                        if car.version.fuelEfficiencyHgw && typeof car.version.fuelEfficiencyHgw !== 'string'
                            h5 Highway: #{Math.round(car.version.fuelEfficiencyHgw*1.6)} kpg
                    .card-technical-row(id='imperialMixed')
                        img(src='/images/icons/mixedIcons/mixed1.svg' alt='Mixed Icon')
                        if !car.version.fuelEfficiencyMixed 
                            h5 Mixed: N/A
                        if car.version.fuelEfficiencyMixed && typeof car.version.fuelEfficiencyMixed !== 'string'
                            h5 Mixed: #{car.version.fuelEfficiencyMixed} mpg
                    .card-technical-row(id='metricMixed' class='invisible')
                        img(src='/images/icons/mixedIcons/mixed1.svg' alt='Mixed Icon')
                        if !car.version.fuelEfficiencyMixed
                            h5 Mixed: N/A 
                        if car.version.fuelEfficiencyMixed && typeof car.version.fuelEfficiencyMixed !== 'string'
                            h5 Mixed: #{Math.round(car.version.fuelEfficiencyMixed*1.6)} kpg
                    .card-technical-row(id='imperialCity')
                        img(src='/images/icons/cityIcons/city1.svg' alt='City Icon')
                        if !car.version.fuelEfficiencyCity 
                            h5 City: N/A
                        if car.version.fuelEfficiencyCity && typeof car.version.fuelEfficiencyCity !== 'string'
                            h5 City: #{car.version.fuelEfficiencyCity} mpg
                    .card-technical-row(id='metricCity' class='invisible')
                        img(src='/images/icons/cityIcons/city1.svg' alt='City Icon')
                        if !car.version.fuelEfficiencyCity
                            h5 City: N/A 
                        if car.version.fuelEfficiencyCity && typeof car.version.fuelEfficiencyCity !== 'string'
                            h5 City: #{Math.round(car.version.fuelEfficiencyCity*1.6)} kpg
            .card-technical
                .card-technical-title(id='measurementSwitch')
                    .card-technical-title-group
                        img(src='/images/icons/performanceIcons/performance1.svg' alt='Performance Icon')
                        h4 Performance   
                    .measurementSystem(id='measurementPerformance') 
                        p(class='selectedText') Imperial
                        p |
                        p Metric
                .card-technical-rows(id='imperialSpeed')
                    .card-technical-row
                        img(src='/images/icons/speedIcons/speed1.svg' alt='Speed Icon')
                        if car.version.maxSpeed 
                            h5 Top speed: #{`${Math.round(car.version.maxSpeed/1.6)} mph`}
                        if car.version.maxSpeed < 1
                            h5 Top speed: N/A
                        if car.version.maxSpeed == 'null'
                            h5 Top speed: N/A
                .card-technical-rows(id='imperialAcceleration')
                    .card-technical-row
                        img(src='/images/icons/accelerationIcons/acceleration1.svg' alt='Acceleration Icon' id='accelerationIcon')
                        if car.version.accel0To100 
                            h5 Acceleration (0-60 mph): #{`${car.version.accel0To100} s`}
                        if car.version.accel0To100 < 1
                            h5 Acceleration (0-60 mph): N/A
                        if car.version.accel0To100 == 'null'
                            h5 Acceleration (0-60 mph): N/A
                .card-technical-rows(id='metricSpeed' class='invisible')
                    .card-technical-row
                        img(src='/images/icons/speedIcons/speed1.svg' alt='Speed Icon')
                        if car.version.maxSpeed 
                            h5 Top speed: #{`${car.version.maxSpeed} km/h`}
                        if car.version.maxSpeed < 1
                            h5 Top speed: N/A
                        if car.version.maxSpeed == 'null'
                            h5 Top speed: N/A
                .card-technical-rows(id='metricAcceleration' class='invisible')
                    .card-technical-row
                        img(src='/images/icons/accelerationIcons/acceleration1.svg' alt='Acceleration Icon' id='accelerationIcon')
                        if car.version.accel0To100 
                            h5 Acceleration (0-100 km/h): #{`${car.version.accel0To100} s`}
                        if car.version.accel0To100 < 1
                            h5 Acceleration (0-100 km/h): N/A
                        if car.version.accel0To100 == 'null'
                            h5 Acceleration (0-100 km/h): N/A
    .car-basic-info
        .car-basic-info-section1
            .car-logo 
                img(src=car.make.logoSrc, alt=`${car.make.name} logo`)
            .car-basic-details
                .car-technical 
                    h3 Make: 
                        a(href=car.make.url) #{car.make.name}
                    if car.version.fuel 
                        h3 Energy:
                            a(href='')  #{car.version.fuel}
                    h3 Mileage: #{car.mileage.toLocaleString()} miles
                    h3 Color: #{car.color}
                    h3 Energy:
        .car-basic-info-section2
            .car-info 
                    h2 $#{car.price.toLocaleString()}
                    - status = car.status==='Available' ? 'carAvailable' : 'carSold'
                    h2(id=status) #{car.status}
        .car-basic-info-section3 
            .car-location
                div
                    img(src='/images/icons/locationIcons/location1.svg' alt='Car location icon')
                    - location = undefined===car.country? 'N/A' : car.country
                    p Car Location: #{location}
            .car-contact
                div
                    img(src='/images/icons/contactIcons/contact1.svg' alt='Car contact icon')
                    a Contact Seller
                div(class='invisible')
                    form 
                        input(type='text' resize='none' id='msgToSeller' placeholder='Type your message...' required='true')
                        button(type='submit') Send
            
    
    .car-description 
        p= car.description
    .car-interests 
        h4 You might be interested in... 
        .car-links
            if car.version.versionBodyType !== null 
                - body = /s$/.test(car.version.versionBodyType) ? car.version.versionBodyType : `${car.version.versionBodyType}s`
                h4 
                    a(href='') #{body}
                h4 
                    a(href='') #{body} by #{car.make.name}
                h4 
                    - typeLowerCase = ''
                    - body==='SUVs' ? typeLowerCase='SUV' : typeLowerCase = body.toLowerCase()
                    a(href='') #{car.make.demonym} #{typeLowerCase}
                h4 
                    a(href='') #{car.version.fuel} #{typeLowerCase}
            else 
                h4 
                    a(href='') #{car.make.demonym} cars


