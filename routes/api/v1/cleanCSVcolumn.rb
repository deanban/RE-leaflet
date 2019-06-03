# Made by Prasenjit Banik 2018
# USE & LICENSE: AS-IS. MIT.
    # This had worked for me when I needed it. 
    # You can edit the code as you need this to behave.

require 'csv'

csv_files = ["2017_AGE_RACE_Actual_Data.csv", "2017_education_level_ann.csv", "2017_Income_with_ann.csv",
            "2017_migration_pattern_ann.csv", "2017_renter_ann.csv"]

# tldr: Don't be fooled if you view the new files in excel or in numbers. 
    # Those apps drops all the leading zeros by default.
# tldr: Don't worry! The zeros are there as long as you don't **save** in excel or numbers! 
    # Continue using data programatically as intended.

# if the new csv file is opened with excel or numbers, it will drop the leading zeros 
    # from all the zipcodes where ever they are found.
# best practice is to open it in txt format, or open it in text editor. 
    # If needed, use a "csv viewer" extension.

#this program will need a minute or two to finish. So Wait! Your computer most likely isn't frozen.

csv_files.each do |file|
    #load file while dropping the first line or row.
    csv_file = CSV.parse(File.readlines("routes/api/v1/csvdata/#{file}").drop(1).join, headers: true)
    #clean column "GEO.display-label"
    concat_row_items = csv_file.by_row!.each do |row|
        row[2].to_s.gsub! "ZCTA5", ""
        #just in case your dumbass didn't read the comments above and saved in excel, 
            #you can rerun this program against the new csv file, or the original.
        row[2].length == 5 && "0" << row
    end
    #delete all the columms with the words "Margin of Error"
    new_csv = concat_row_items.by_col!.delete_if do |col_name, col_val|
        col_name.include? "Margin of Error"
    end
    #save file
    File.write("routes/api/v1/csvdata/Cleaned_#{file}", new_csv.to_csv)
end