$(document).ready(function()
{
    var entry = "";
    var openBracketsCount = 0;  // Used to stop right brackets appearing before left brackets
    var firstEntry = true;      // Used to determine if input should replace or append what is in display

    /*
        Symbol has been added - initiates check for validity and
        triggers output in display
     */
    $(".input").click(function()
    {
        entry = $.trim($(this).text());
        if(checkValidity(entry))
        {
            // Adjust open bracket count
            switch (entry)
            {
                case "(":
                    openBracketsCount++;
                    break;
                case ")":
                    openBracketsCount--;
                    break;
                default:
                    break;
            }
            updateDisplay($(this).text());
            firstEntry = false;
        }
    });

    /*
        Checks if brackets are valid (can be parsed with the
        rest of the input without errors)
     */
    function checkValidity(entry)
    {
        entry = $.trim(entry);
        // determine if a bracket is allowed
        return (entry === ")" && openBracketsCount < 1) ? false : true;
    }

    function updateDisplay(entry)
    {
        // Replace old value in input display if not using it
        if((firstEntry && !isOperator(entry)) || ($("#inputDisplay").text() === "ERROR"))
        {
            $("#inputDisplay").text(entry.replace(/\s/g,''));
        }
        // Use old value if applying operations
        else
        {
            $("#inputDisplay").append(entry.replace(/\s/g,''));
        }

    }

    /*
        Returns true if the entry is an operator, otherwise false
     */
    function isOperator(entry)
    {
        entry = $.trim(entry);
        if(entry === "+" || entry === "-" || entry === "*" || entry === "/")
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /*
        Clear the input display and history display
     */
    $("#clear").click(function()
    {
        entry = "0";
        $("#inputDisplay").text(entry);
        $("#historyDisplay").empty();
        firstEntry = true;
    });

    /*
        Remove one character from the input display.
        Removes the right-most character
     */
    $("#backspace").click(function()
    {
        entry = $("#inputDisplay").text();
        if(entry.length > 1)
        {
            $("#inputDisplay").text(entry.slice(0,-1));
        }
        else
        {
            $("#inputDisplay").text("0");
            firstEntry = true;
        }
    });


    /*
        Evaluates the input string and writes it to the input display.
        Moves the input string to the output display
     */
    $("#evaluate").click(function()
    {
        let inputString = $("#inputDisplay").text();
        let result = 0;

        try
        {
            result = eval(inputString.replace(/\s/g,''));
        }
        catch(e)
        {
            result = "ERROR";
        }

        // Check if last entered character was an operator
        if(isOperator([inputString.length -1]))
        {
            result = "ERROR";
        }
        if(result === Infinity || result === -Infinity)
        {
            result = "ERROR";
        }

        $("#historyDisplay").empty();
        $("#historyDisplay").append($("#inputDisplay").text());
        $("#inputDisplay").empty();
        $("#inputDisplay").append(result);
        firstEntry = true;
    });

});